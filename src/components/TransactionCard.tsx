import React from "react";
import type { Schema } from "../../amplify/data/resource";
import classNames from "classnames";

// interface describing the shape of the transaction prop
interface TransactionProps {
    transaction: Schema["Transaction"]["type"];
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
const TransactionCard: React.FC<TransactionProps> = ({ transaction }) => {

    const statusLabel = transaction.isFraudulent
        ? "Blocked - Possible Fraud"
        : "Processed";

    const statusClass = transaction.isFraudulent
        ? "text-red-500"
        : "text-green-700";

    return (
        <div className={cardClass}>
            <div>
                <div className="text-sm font-semibold">
                    {transaction.vendor}
                </div>
                <div className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                </div>
            </div>
            <div className={`text-sm font-bold ${statusClass}`}>
                - ${transaction.amount?.toFixed(2)} <span>({statusLabel})</span>
            </div>
        </div>
    );
};

export default TransactionCard;
