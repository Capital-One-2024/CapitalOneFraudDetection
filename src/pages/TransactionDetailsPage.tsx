import classNames from "classnames";
import Page from "../components/Page";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Schema } from "../../amplify/data/resource";
import NewTransactionPopup from "../components/NewTransactionPopUp";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { generateClient } from "aws-amplify/data";
import { getFormattedCoordinates, getFormattedCurrency, getFormattedDate } from "../lib/utils";
import TransactionDetailsAttribute from "../components/TransactionDetailsAttribute";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";

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

        client.models.Transaction.onUpdate({
            filter: { id: { eq: transaction?.id } },
        }).subscribe({
            next: (updatedTransaction) => {
                setTransaction(updatedTransaction);
            },
            error: (error) => {
                console.error(error);
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    async function flipIsFraudulent() {
        setLoading(true);

        if (transaction) {
            const { data: account, errors: getAccountErrors } = await client.models.Account.get({
                id: transaction.accountId,
            });

            const { errors: updateTransactionErrors } = await client.models.Transaction.update({
                id: transaction.id,
                isFraudulent: !transaction.isFraudulent,
                isUserValidated: true,
                updatedAt: Date.now(),
            });

            if (account) {
                await client.models.Account.update({
                    id: transaction.accountId,
                    balance:
                        account.balance +
                        (transaction.isFraudulent ? -transaction.amount : transaction.amount),
                });
            }

            if (getAccountErrors || updateTransactionErrors) {
                setShowSuccess(false);
                setLoading(false);
            } else {
                setShowSuccess(true);
                setLoading(false);
            }
        }
    }

    return (
        <Page title="Transaction Details" isProtected={true}>
            <div className={"flex-1 flex flex-col items-center justify-center p-5"}>
                {transaction && (
                    <div
                        className={classNames(
                            "flex flex-col items-center sm:w-3/5 max-w-xl bg-red p-5 shadow-xl",
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
                            {transaction.isProcessed ? (
                                transaction.isFraudulent ? (
                                    <span>
                                        Blocked - Suspected to be Fraudulent{" "}
                                        <GppBadIcon className="!text-c1-red" />
                                    </span>
                                ) : (
                                    <span>
                                        Processed <GppGoodIcon className="!text-emerald-600" />
                                    </span>
                                )
                            ) : (
                                <span>
                                    Processing{" "}
                                    <RotateRightIcon className="animate-spin !text-c1-blue" />
                                </span>
                            )}
                        </TransactionDetailsAttribute>

                        {transaction.isProcessed && (
                            <button
                                onClick={() => flipIsFraudulent()}
                                className={"btn btn-red"}
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
