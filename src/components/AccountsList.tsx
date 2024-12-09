import React from "react";
import type { Schema } from "../../amplify/data/resource";
import AccountCard from "./AccountCard";
import AccountCardSkeleton from "./AccountCardSkeleton";

type AccountProps = {
    accounts: Schema["Account"]["type"][];
    isLoading: boolean;
    error: string | null;
};

const AccountsList: React.FC<AccountProps> = ({ accounts, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="flex flex-wrap gap-4">
                {Array(2)
                    .fill(null)
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    .map((_, index) => (
                        <AccountCardSkeleton key={index} />
                    ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (accounts.length === 0) {
        return <p className="text-lg text-gray-600 mt-4">No accounts made yet...</p>;
    }

    return (
        <div className="flex flex-wrap gap-4">
            {accounts.map((account) => (
                <AccountCard key={account.id} account={account} />
            ))}
        </div>
    );
};

export default AccountsList;
