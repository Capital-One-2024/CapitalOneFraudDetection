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
    const [loading, setLoading] = useState(true); // Step 1: Loading state

    useEffect(() => {
        if (user) {
            console.log(user);

            // gets user details for welcome section
            fetchUserAttributes()
                .then((result) => {
                    setUserDetails(result);
                })
                .catch((err) => console.error(err));

            // Fetch transactions
            client.models.Transaction.observeQuery().subscribe({
                next: (data) => {
                    setTransactions([...data.items]);
                    setLoading(false); // once everything is loaded, loading will stop
                },
                error: (err) => {
                    console.error(err);
                    setLoading(false); // Ensure loading ends even on error
                },
            });
        }
    }, [user]);

    // temporary create transaction, will remove once New Transaction is merged with main
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

    // loading signal
    if (loading) {
        return (
            <div className="
             flex items-center
             justify-center
             min-h-screen
             bg-gray-100">
                <div
                    className="
                        animate-spin
                        rounded-full
                        h-16
                        w-16
                        border-t-4
                        border-c1-blue"
                ></div>

            </div>
        );
    }

    return (
        <Page title="Dashboard" isProtected={true}>
            <div className="p-8 font-sans">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="p-4
                    rounded-lg
                    border
                    bg-c1-blue
                    shadow-md"
                    >
                        <h2 className="text-lg
                         font-semibold
                         text-white"
                        >
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
                            <Transaction key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                </section>
            </div>
        </Page>
    );
}

export default DashboardPage;

