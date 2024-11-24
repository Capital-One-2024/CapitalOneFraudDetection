import React, { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import TransactionCard from "../components/TransactionCard";
import TransactionCardSkeleton from "../components/TransactionCardSkeleton";

const client = generateClient<Schema>();

const TransactionsList: React.FC = () => {
    const [transactions, setTransactions] = useState<Array<Schema["Transaction"]["type"]>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscription = client.models.Transaction.observeQuery().subscribe({
            next: (data) => {
                setTransactions([...data.items]);
                setLoading(false);
            },
            error: (err) => {
                console.error(err);
                setLoading(false);
            },
        });

        return () => subscription.unsubscribe(); // Cleanup subscription
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                {/* need item in order to properly load the transactions skeleton */}
                {Array(4).fill(null).map((item, index) => (
                    <TransactionCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
};

export default TransactionsList;
