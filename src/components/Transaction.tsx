import React from "react";
import type { Schema } from "../../amplify/data/resource";

// interface describing the shape of the transaction prop
interface TransactionProps {
    transaction: Schema["Transaction"]["type"];
}

// Transaction component will use TransactionProps for type checking
// eslint-disable-next-line
const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
    return (
        <div
            className="flex justify-between items-center
                bg-white
                shadow-md
                rounded-lg p-4 border
                border-gray-200"
        >
            <div>
                <div className="text-sm font-semibold">
                    {transaction.vendor}
                </div>
                <div className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                </div>
            </div>
            <div className="text-red-500 font-bold">
                {transaction.isFraudulent ? (
                    <span className="text-orange-500">
                        - ${transaction.amount?.toFixed(2)}
                    </span>
                ) : (
                    <span>- ${transaction.amount?.toFixed(2)}</span>
                )}
            </div>
        </div>
    );
};

export default Transaction;
