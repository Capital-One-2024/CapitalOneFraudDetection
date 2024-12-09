import { useEffect, useState } from "react";
import Page from "../components/Page";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import WelcomeSkeleton from "../components/WelcomeSkeleton";
import TransactionsList from "../components/TransactionsList";
import AccountsList from "../components/AccountsList";
import { capitalize } from "../lib/utils";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function DashboardPage() {
    const { user } = useAuthenticator();
    const [accounts, setAccounts] = useState<Schema["Account"]["type"][]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [loadingAccountError, setLoadingAccountError] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput | undefined>(
        undefined
    );

    useEffect(() => {
        if (user) {
            // get user attributes for welcome section
            fetchUserAttributes()
                .then((result) => setUserDetails(result))
                .catch((err) => console.error(err));

            // fetch user accounts
            const subscription = client.models.Account.observeQuery({
                filter: { userId: { eq: user.userId } },
            }).subscribe({
                next: (data) => {
                    const fetchedAccounts = data.items as Schema["Account"]["type"][];
                    setAccounts(fetchedAccounts);
                    setLoadingAccounts(false);
                    setLoadingAccountError(null);
                },
                error: (err) => {
                    console.error("Failed to fetch accounts:", err);
                    setLoadingAccountError("Failed to fetch accounts.");
                    setLoadingAccounts(false);
                },
            });

            return () => subscription.unsubscribe();
        }
    }, [user]);

    return (
        <Page title="Dashboard" isProtected={true}>
            <div className="flex-1 flex flex-col p-8 gap-8">
                {/* Welcome Section */}
                <div>
                    {userDetails ? (
                        <div className="p-8 rounded-lg border bg-c1-blue shadow-md">
                            <h2 className="text-lg font-semibold text-white">
                                Welcome, {capitalize(userDetails.given_name!)}{" "}
                                {capitalize(userDetails.family_name!)}!
                            </h2>
                        </div>
                    ) : (
                        <WelcomeSkeleton />
                    )}
                </div>

                {/* Accounts Section */}
                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">My Accounts</h2>
                    <hr className="border-none h-[2px] bg-gray-200 rounded-lg" />
                    <AccountsList
                        accounts={accounts}
                        isLoading={loadingAccounts}
                        error={loadingAccountError}
                    />
                </section>

                {/* Transactions Section */}
                <section className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">My Transactions</h2>
                    <hr className="border-none h-[2px] bg-gray-200 rounded-lg" />
                    <TransactionsList accounts={accounts} />
                </section>
            </div>
        </Page>
    );
}

export default DashboardPage;
