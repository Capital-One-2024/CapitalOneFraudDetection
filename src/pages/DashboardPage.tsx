import { useEffect, useState } from "react";
import Page from "../components/Page";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import WelcomeSkeleton from "../components/WelcomeSkeleton";
import TransactionsList from "../components/TransactionsList";
import AccountsList from "../components/AccountsList";

function DashboardPage() {
    const { user } = useAuthenticator();
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            // get user attributes for welcome section
            fetchUserAttributes()
                .then((result) => setUserDetails(result))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
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

                {/* Accounts Section */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">My Accounts</h2>
                    <AccountsList />
                </section>

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
