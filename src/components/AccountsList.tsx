import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import AccountCard from "./AccountCard";
import AccountCardSkeleton from "./AccountCardSkeleton";

const client = generateClient<Schema>();

const AccountsList: React.FC = () => {
    const { user } = useAuthenticator();
    const [accounts, setAccounts] = useState<Schema["Account"]["type"][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.userId) {
            setIsLoading(false);
            return;
        }

        const subscription = client.models.Account.observeQuery({
            filter: { userID: { eq: user.userId } },
        }).subscribe({
            next: (data) => {
                console.log("Fetched accounts:", data.items);
                const fetchedAccounts = data.items as Schema["Account"]["type"][];
                setAccounts(fetchedAccounts);
                setIsLoading(false);
            },
            error: (err) => {
                console.error("Failed to fetch accounts:", err);
                setError("Failed to fetch accounts. Please try again later.");
                setIsLoading(false);
            },
        });

        return () => subscription.unsubscribe();
    }, [user?.userId]);

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
