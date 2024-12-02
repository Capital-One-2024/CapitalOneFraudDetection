import Page from "../components/Page";
import { useEffect, useState } from "react";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import WelcomeSkeleton from "../components/WelcomeSkeleton";
import TransactionsList from "../components/TransactionsList";

const client = generateClient<Schema>();

function DashboardPage() {
    const { user } = useAuthenticator();
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
    const [loading, setLoading] = useState(true); // Step 1: Loading state

    useEffect(() => {
        if (user) {
            // gets user details for welcome section
            fetchUserAttributes()
                .then((result) => {
                    setUserDetails(result);
                })
                .catch((err) => console.error(err));

            // Fetch transactions
            client.models.Transaction.observeQuery().subscribe({
                next: () => {
                    setLoading(false); // once everything is loaded, loading will stop
                },
                error: (err) => {
                    console.error(err);
                    setLoading(false); // Ensure loading ends even on error
                },
            });
        }
    }, [user]);

    return (
        <Page title="Dashboard" isProtected={true}>
            <div className="p-8 font-sans">
                {/* Welcome Section */}
                <div className="mb-8">
                    {loading ? (
                        <WelcomeSkeleton />
                    ) : (
                        <div className="p-4 rounded-lg border bg-c1-blue shadow-md">
                            <h2 className="text-lg font-semibold text-white">
                                Welcome, {userDetails?.given_name} {userDetails?.family_name}!
                            </h2>
                        </div>
                    )}
                </div>

                {/* Transactions Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">My Transactions</h2>
                    <TransactionsList />
                </section>
            </div>
        </Page>
    );
}

export default DashboardPage;
