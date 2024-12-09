import Page from "../components/Page";
import { fetchUserAttributes, type FetchUserAttributesOutput } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import ProfileDetail from "../components/ProfileDetail";
import { signOut } from "aws-amplify/auth";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    // Function to handle sign out
    const handleSignOut = () => {
        signOut();
        navigate("/");
    };

    return (
        <Page title="Profile" isProtected={true}>
            <div className="flex-1 flex justify-center items-center">
                <div
                    className={classNames(
                        "flex w-full flex-col items-center justify-center p-5 gap-8 max-w-2xl",
                        "border-2 border-c1-blue rounded-lg shadow-xl"
                    )}
                >
                    {loading ? (
                        <CircularProgress size={80} />
                    ) : userDetails ? (
                        <>
                            <Avatar sx={{ bgcolor: "#004878", width: 95, height: 95 }}>
                                {userDetails.given_name?.charAt(0).toUpperCase()}
                                {userDetails.family_name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <ProfileDetail
                                description="Email"
                                attributeKey="email"
                                attribute={userDetails.email!}
                                onUpdateComplete={fetchUserDetails}
                            />
                            <ProfileDetail
                                description="First Name"
                                attributeKey="given_name"
                                attribute={userDetails.given_name!}
                                onUpdateComplete={fetchUserDetails}
                            />
                            <ProfileDetail
                                description="Last Name"
                                attributeKey="family_name"
                                attribute={userDetails.family_name!}
                                onUpdateComplete={fetchUserDetails}
                            />
                            <button
                                type="button"
                                className="btn btn-blue w-1/3"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text-center mt-10">
                                <p className="text-lg text-gray-600 mt-4">
                                    Error fetching profile details. Please try again.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Page>
    );
}
