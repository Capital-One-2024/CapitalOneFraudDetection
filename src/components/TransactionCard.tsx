import React from "react";
import type { Schema } from "../../amplify/data/resource";
import classNames from "classnames";

import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/transaction-details", { state: transaction });
    };

    return (
        <button className={cardClass} onClick={handleClick}>
            <div>
                <div className="text-sm font-semibold text-left">{transaction.vendor}</div>
                <div className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                </div>
            </div>
            <div className={`text-sm font-bold ${statusClass}`}>
                - ${transaction.amount?.toFixed(2)} <span>({statusLabel})</span>
            </div>
        </button>
    );
};

export default TransactionCard;
