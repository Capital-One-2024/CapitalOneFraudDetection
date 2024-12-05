import React from "react";
import type { Schema } from "../../amplify/data/resource";
import classNames from "classnames";

// Interface describing the shape of the account prop
interface AccountProps {
    account: Schema["Account"]["type"];
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
    "border-gray-200",
    "w-80"
);

// Account component will use AccountProps for type checking
const AccountCard: React.FC<AccountProps> = ({ account }) => {
    return (
        <div className={cardClass}>
            <div>
                <div className="text-sm font-semibold text-left">
                    {account.accountName || "Unnamed Account"}
                </div>
                <div className="text-xs text-gray-500">
                    Balance: ${account.balance?.toFixed(2) || "0.00"}
                </div>
            </div>
        </div>
    );
};

export default AccountCard;
