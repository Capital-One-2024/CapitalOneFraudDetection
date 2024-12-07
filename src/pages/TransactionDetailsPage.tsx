import classNames from "classnames";
import Page from "../components/Page";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Schema } from "../../amplify/data/resource";

import NewTransactionPopup from "../components/NewTransactionPopUp";

import { generateClient } from "aws-amplify/data";
import { getFormattedCoordinates, getFormattedCurrency, getFormattedDate } from "../lib/utils";
import TransactionDetailsAttribute from "../components/TransactionDetailsAttribute";

export default function TransactionDetailsPage() {
    const [transaction, setTransaction] = useState<Schema["Transaction"]["type"]>();
    const [accountName, setAccountName] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const location = useLocation();

    const client = generateClient<Schema>();

    useEffect(() => {
        setTransaction(location.state.transaction);
        setAccountName(location.state.accountName);
    }, [location]);

    async function flipIsFraudulent() {
        setLoading(true);

        if (transaction) {
            const { data: updatedTrans, errors } = await client.models.Transaction.update({
                id: transaction.id,
                isFraudulent: !transaction.isFraudulent,
                isUserValidated: true,
                updatedAt: Date.now(),
            });

            if (errors) {
                setShowSuccess(false);
                setLoading(false);
            } else if (updatedTrans) {
                setTransaction(updatedTrans);
                setShowSuccess(true);
                setLoading(false);
            }
        }
    }

    return (
        <Page title="Transaction Details" isProtected={true}>
            <div
                className={classNames(
                    "flex-1 flex flex-col-reverse items-center",
                    "justify-center p-5"
                )}
            >
                {transaction && (
                    <div
                        className={classNames(
                            "sm:w-3/5 w-full bg-red p-5 ",
                            "border-2 border-c1-blue rounded-xl"
                        )}
                    >
                        <div className="mb-8 text-center text-c1-blue text-xl">
                            Transaction: {transaction.id}
                        </div>
                        <TransactionDetailsAttribute label="Account">
                            {accountName}
                        </TransactionDetailsAttribute>
                        <TransactionDetailsAttribute label="Amount">
                            {getFormattedCurrency(transaction.amount)}
                        </TransactionDetailsAttribute>
                        <TransactionDetailsAttribute label="Category">
                            {transaction.category}
                        </TransactionDetailsAttribute>
                        <TransactionDetailsAttribute label="Vendor">
                            {transaction.vendor}
                        </TransactionDetailsAttribute>
                        <TransactionDetailsAttribute label="Date & Time">
                            {getFormattedDate(new Date(transaction.createdAt))}
                        </TransactionDetailsAttribute>
                        <TransactionDetailsAttribute label="Location">
                            {getFormattedCoordinates(transaction.latitude, transaction.longitude)}
                        </TransactionDetailsAttribute>
                        <TransactionDetailsAttribute label="Status">
                            {transaction.isProcessed
                                ? transaction.isFraudulent
                                    ? "Blocked - Suspected to be Fraudulent"
                                    : "Processed"
                                : "Processing"}
                        </TransactionDetailsAttribute>

                        {transaction.isProcessed && (
                            <button
                                onClick={() => flipIsFraudulent()}
                                className={classNames(
                                    "w-full border bg-c1-red p-2 mb-2",
                                    "text-white rounded-lg hover:bg-red-700"
                                )}
                                disabled={loading}
                            >
                                Report Transaction as{" "}
                                {transaction.isFraudulent ? "Not Fraudulent" : "Fraudulent"}
                            </button>
                        )}
                    </div>
                )}
            </div>
            <NewTransactionPopup
                show={showSuccess}
                type="success"
                message={`The transaction was reported as 
                    ${transaction?.isFraudulent ? "fraudulent" : "not fraudulent"} 
                    successfully.`}
                onClose={() => setShowSuccess(false)}
            />
            <NewTransactionPopup
                show={showFailure}
                type="failure"
                message="There was an error when reporting the transaction."
                onClose={() => setShowFailure(false)}
            />
        </Page>
    );
}
