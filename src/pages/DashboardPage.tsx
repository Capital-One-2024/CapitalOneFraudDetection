import Page from "../components/Page";
import { useEffect, useState } from "react";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Transaction from "../components/Transaction";

const client = generateClient<Schema>();

function DashboardPage() {
    const { user } = useAuthenticator();

    const [transactions, setTransactions] = useState<Array<Schema["Transaction"]["type"]>>([]);
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();

    useEffect(() => {
        if (user) {
            console.log(user);

            fetchUserAttributes().then((result) => {
                setUserDetails(result);
            });

            client.models.Transaction.observeQuery().subscribe({
                next: (data) => setTransactions([...data.items]),
            });
        }
    }, [user]);

    function createTransaction() {
        client.models.Transaction.create({
            userID: user.userId,
            vendor: "Chipotle",
            category: "Food",
            amount: 25000,
            latitude: 20,
            longitude: 20,
            isFraudulent: false,
            isUserValidated: false,
        });
    }

    return (
        <Page title="Dashboard" isProtected={true}>
            <div className="p-8 font-sans">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="p-4 rounded-lg border bg-c1-blue shadow-md">
                        <h2 className="text-lg font-semibold text-white">
                            Welcome, {userDetails?.given_name} {userDetails?.family_name}!
                        </h2>
                    </div>
                </div>

                {/* Create Transaction Button */}
                <div className="mb-8">
                    <button
                        onClick={createTransaction}
                        className="
                        px-4 py-2
                        bg-blue-500
                        text-white
                        rounded-lg
                        hover:bg-blue-600"
                    >
                        + New Transaction
                    </button>
                </div>

                {/* Transactions Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">My Transactions</h2>
                    <div className="flex flex-col gap-4">
                        {transactions.map((transaction) => (

                            // for clarity:
                            // left side transaction is property defined in interface
                            // right side of transaction is the transaction object itself
                            <Transaction key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                </section>
            </div>
        </Page>
    );
}

export default DashboardPage;
