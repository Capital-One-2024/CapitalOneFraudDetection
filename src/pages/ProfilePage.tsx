import Page from "../components/Page";
import { fetchUserAttributes, type FetchUserAttributesOutput } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import ProfileDetail from "../components/ProfileDetail";
import { signOut } from "aws-amplify/auth";
import Avatar from "@mui/material/Avatar";

export default function ProfilePage() {
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
    const [loading, setLoading] = useState(true);

    // Function to fetch user attributes
    const fetchUserDetails = () => {
        setLoading(true); // Start loading before fetching
        fetchUserAttributes()
            .then((result: FetchUserAttributesOutput) => {
                setUserDetails(result);
                setLoading(false);
            })
            .catch((err: Error) => {
                console.log("Error fetching user attributes:", err);
                setLoading(false);
            });
    };

    // Fetch Current User Attributes on Component Mount
    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <Page title="Profile" isProtected={true}>
            <div
                className={classNames(
                    "flex",
                    "flex-col",
                    "justify-center",
                    "items-center",
                    "gap-8",
                    "p-8"
                )}
            >
                {loading ? (
                    <CircularProgress size={80} />
                ) : (
                    <>
                        <Avatar sx={{ bgcolor: "#004878", width: 95, height: 95 }}>
                            {userDetails.given_name?.charAt(0)}
                            {userDetails.family_name?.charAt(0)}
                        </Avatar>
                        <ProfileDetail
                            description="Email"
                            attributeKey="email"
                            attribute={userDetails.email}
                            onUpdateComplete={fetchUserDetails}
                        />
                        <ProfileDetail
                            description="First Name"
                            attributeKey="given_name"
                            attribute={userDetails.given_name}
                            onUpdateComplete={fetchUserDetails}
                        />
                        <ProfileDetail
                            description="Last Name"
                            attributeKey="family_name"
                            attribute={userDetails.family_name}
                            onUpdateComplete={fetchUserDetails}
                        />
                        <button
                            type="button"
                            className="btn btn-blue w-1/3"
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </Page>
    );
}
