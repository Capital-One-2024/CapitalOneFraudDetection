import React, { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import TransactionCard from "../components/TransactionCard";
import TransactionCardSkeleton from "../components/TransactionCardSkeleton";

const client = generateClient<Schema>();

type TransactionsListProps = {
    accounts: Schema["Account"]["type"][];
};

const TransactionsList: React.FC<TransactionsListProps> = ({ accounts }) => {
    const [transactions, setTransactions] = useState<Array<Schema["Transaction"]["type"]>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscription = client.models.Transaction.observeQuery().subscribe({
            next: (data) => {
                try {
                    const sortedTransactions = [...data.items].sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setTransactions(sortedTransactions);
                } catch (error) {
                    console.error("Error sorting transactions:", error);
                } finally {
                    setLoading(false);
                }
            },
        });
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);
    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                {Array(4)
                    .fill(null)
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    .map((_, index) => (
                        <TransactionCardSkeleton key={index} />
                    ))}
            </div>
        );
    }

    if (transactions.length === 0) {
        return <p className="text-lg text-gray-600 mt-4">No Transactions made yet...</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {transactions.map((transaction) => {
                const account = accounts.find((account) => account.id === transaction.accountId);
                const accountName = account
                    ? `${account.accountName} xxxx${account.id.substring(account.id.length - 4)}`
                    : null;

                return (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        accountName={accountName}
                    />
                );
            })}
        </div>
    );
};

export default TransactionsList;
