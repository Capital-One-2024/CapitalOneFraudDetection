import { useEffect, useState } from "react";
import Page from "../components/Page";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import WelcomeSkeleton from "../components/WelcomeSkeleton";
import TransactionsList from "../components/TransactionsList";
import AccountsList from "../components/AccountsList";
import { capitalize } from "../lib/utils";

function DashboardPage() {
    const { user } = useAuthenticator();
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput | undefined>(
        undefined
    );

    useEffect(() => {
        if (user) {
            // get user attributes for welcome section
            fetchUserAttributes()
                .then((result) => setUserDetails(result))
                .catch((err) => console.error(err));
        }
    }, [user]);

    return (
        <Page title="Dashboard" isProtected={true}>
            <div className="p-8 font-sans">
                {/* Welcome Section */}
                <div className="mb-8">
                    {userDetails ? (
                        <div className="p-4 rounded-lg border bg-c1-blue shadow-md">
                            <h2 className="text-lg font-semibold text-white">
                                Welcome, {capitalize(userDetails.given_name)}{" "}
                                {capitalize(userDetails.family_name)}!
                            </h2>
                        </div>
                    ) : (
                        <WelcomeSkeleton />
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
