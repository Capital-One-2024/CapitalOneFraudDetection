import React from "react";
import type { Schema } from "../../amplify/data/resource";
import classNames from "classnames";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from "react-router-dom";
import { getFormattedCurrency, getFormattedDate } from "../lib/utils";

// interface describing the shape of the transaction prop
interface TransactionProps {
    transaction: Schema["Transaction"]["type"];
    accountName: string | null;
}

const cardClass = classNames(
    "flex",
    "justify-between",
    "items-center",
    "bg-white",
    "shadow-md",
    "rounded-lg",
    "p-4",
    "border",
    "border-gray-200"
);

// Transaction component will use TransactionProps for type checking
const TransactionCard: React.FC<TransactionProps> = ({ transaction, accountName }) => {
    let statusLabel = "";
    let statusClass = "";

    if (transaction.isProcessed) {
        if (transaction.isFraudulent) {
            statusLabel = "Blocked - Possible Fraud";
            statusClass = "text-red-500";
        } else {
            statusLabel = "Processed";
            statusClass = "text-green-700";
        }
    } else {
        statusLabel = "Pending";
        statusClass = "text-yellow-500";
    }

    const client = generateClient<Schema>();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (!transaction.accountId) {
            console.error("Transaction is missing accountId.");
            return;
        }

        const { data: accountData } = await client.models.Account.get({
            id: transaction.accountId,
        });

        if (!accountData || !accountData.accountName) {
            console.error("Account name is missing or undefined.");
            return;
        }

        navigate("/transaction-details", {
            state: {
                transaction,
                accountName: accountData.accountName,
            },
        });
    };

    return (
        <button className={cardClass} onClick={handleClick}>
            <div className="flex flex-col gap-1 items-start">
                <div className="text-xs font-medium text-gray-500">{accountName}</div>
                <div className="text-md font-semibold text-left">{transaction.vendor}</div>
                <div className="text-xs font-medium text-gray-500">
                    {getFormattedDate(new Date(transaction.createdAt))}
                </div>
            </div>
            <div className={`text-sm font-bold ${statusClass}`}>
                - {getFormattedCurrency(transaction.amount)} <span>({statusLabel})</span>
            </div>
        </button>
    );
};

export default TransactionCard;
