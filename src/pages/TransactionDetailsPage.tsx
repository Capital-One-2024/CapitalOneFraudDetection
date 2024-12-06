import classNames from "classnames";
import Page from "../components/Page";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Schema } from "../../amplify/data/resource";

import NewTransactionPopup from "../components/NewTransactionPopUp";

import { generateClient } from "aws-amplify/data";

export default function TransactionDetailsPage() {
    const [transaction, setTransaction] = useState<Schema["Transaction"]["type"]>();
    const [account, setAccount] = useState<Schema["Account"]["type"]>();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const location = useLocation();

    const client = generateClient<Schema>();

    // helper function to get the accountID from transaction
    async function fetchAccount(accountID: string) {
        try {
            const { data: accountData, errors } = await client.models.Account.get({
                id: accountID,
            });

            if (!errors && accountData) {
                setAccount(accountData);
                console.log(accountData)
            } else {
                console.log("Error fetching account:", errors);
            }
        } catch (err) {
            console.log("Error fetching account:", err);
        }
    }

    useEffect(() => {
        setTransaction(location.state);
    }, [location]);

    useEffect(() => {
        if (transaction?.accountID) {
            fetchAccount(transaction.accountID);
        }
    }, [transaction]);
    

    function formatDateTime() {
        if (transaction) {
            const toFormat = new Date(transaction?.createdAt);
            const formattedDate = toFormat.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            // Format the time part (e.g., "3:06 AM")
            const formattedTime = toFormat.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            // Combine date and time with "at" in between
            const formattedDateTime = `${formattedDate} at ${formattedTime}`;

            return formattedDateTime;
        }

        return null;
    }

    async function flipIsFradulent() {
        setLoading(true);

        if (transaction) {
            const newTransaction = {
                id: transaction.id,
                amount: transaction.amount,
                category: transaction.category,
                vendor: transaction.vendor,
                latitude: transaction.latitude,
                longitude: transaction.longitude,
                userID: transaction.userID,
                isFraudulent: !transaction.isFraudulent,
                isUserValidated: true,
            };

            const { data: updatedTrans, errors } =
                await client.models.Transaction.update(newTransaction);

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
                {transaction ? (
                    <div
                        className={classNames(
                            "sm:w-3/5 w-full bg-red p-5 ",
                            "border border-2 border-c1-blue rounded-xl"
                        )}
                    >
                        <div className="mb-8 text-center text-c1-blue text-xl">
                            Transaction: {transaction.id}
                        </div>
                        <div className="border border-c1-blue p-2 mb-2 sm:flex rounded-lg">
                            <div className="w-1/2 text-c1-blue">Account:</div>
                            <div className="w-1/2">{account?.accountName}</div>
                        </div>
                        <div className="border border-c1-blue p-2 mb-2 sm:flex rounded-lg">
                            <div className="w-1/2 text-c1-blue">Amount:</div>
                            <div className="w-1/2">${transaction.amount}</div>
                        </div>
                        <div className="border border-c1-blue p-2 mb-2 sm:flex rounded-lg">
                            <div className="w-1/2 text-c1-blue">Vendor:</div>
                            <div className="w-1/2">{transaction.vendor}</div>
                        </div>
                        <div className="border border-c1-blue p-2 mb-2 sm:flex rounded-lg">
                            <div className="w-1/2 text-c1-blue">Category:</div>
                            <div className="w-1/2">{transaction.category}</div>
                        </div>
                        <div className="border border-c1-blue p-2 mb-2 sm:flex rounded-lg">
                            <div className="w-1/2 text-c1-blue">Date & Time:</div>
                            <div className="w-1/2">{formatDateTime()}</div>
                        </div>
                        <div className="border border-c1-blue p-2 mb-2 sm:flex rounded-lg">
                            <div className="w-1/2 text-c1-blue">Location:</div>
                            <div className="w-1/2">
                                {transaction.latitude}, {transaction.longitude}
                            </div>
                        </div>
                        <div className="border border-c1-blue p-2 mb-2 sm:flex rounded-lg">
                            <div className="w-1/2 text-c1-blue">Prediction:</div>
                            <div className="w-1/2">
                                {transaction.isFraudulent ? "Fraudulent" : "Not Fraudulent"}
                            </div>
                        </div>

                        <button
                            onClick={() => flipIsFradulent()}
                            className={classNames(
                                "w-full border bg-c1-red p-2 mb-2",
                                "text-white rounded-lg hover:bg-red-700"
                            )}
                            disabled={loading}
                        >
                            Report Transaction as{" "}
                            {transaction.isFraudulent ? "Not Fradulent" : "Fraudulent"}
                        </button>
                    </div>
                ) : null}
            </div>
            <NewTransactionPopup
                show={showSuccess}
                type="success"
                message={`The transaction was reported as 
                    ${transaction?.isFraudulent ? "fraudlent" : "not fraudulent"} 
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
