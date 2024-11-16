import { Authenticator, ThemeProvider, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Navbar from "../components/Navbar";
import { Navigate, useSearchParams } from "react-router-dom";
import { AUTH_PAGE_ACTIONS_SCHEMA } from "../lib/schemas";
import { useEffect } from "react";
import { SEARCH_PARAMS_KEYS, SITE_MAP } from "../lib/constants";

const FORM_FIELDS = {
    signIn: {
        username: {
            type: "email",
            placeholder: "jdoe@example.com",
            isRequired: true,
            label: "Email:",
        },
        password: {
            type: "password",
            placeholder: "********",
            isRequired: true,
            label: "Password:",
        },
    },
    signUp: {
        given_name: {
            type: "text",
            placeholder: "Jane",
            isRequired: true,
            label: "Given Name:",
            order: 1,
        },
        family_name: {
            type: "text",
            placeholder: "Doe",
            isRequired: true,
            label: "Family Name:",
            order: 2,
        },
        email: {
            type: "email",
            placeholder: "jdoe@example.com",
            isRequired: true,
            label: "Email:",
            order: 3,
        },
        password: {
            type: "password",
            placeholder: "********",
            isRequired: true,
            label: "Password:",
            order: 4,
        },
        confirm_password: {
            type: "password",
            placeholder: "********",
            isRequired: true,
            label: "Confirm Password:",
            order: 5,
        },
    },
};

export default function AuthPage() {
    const THEME = {
        name: "custom-theme",
        tokens: {
            colors: {
                primary: {
                    10: "#e5f5ff",
                    20: "#b3e0ff",
                    30: "#80ccff",
                    40: "#4db8ff",
                    50: "#1aa3ff",
                    60: "#008ae6",
                    70: "#006bb3",
                    80: "#004c80",
                    90: "#002e4d",
                    100: "#000f1a",
                },
            },
        },
    };

    // Get the validated action from the URL
    // Default to "signIn" if not present
    const [SEARCH_PARAMS] = useSearchParams();
    const ACTION =
        AUTH_PAGE_ACTIONS_SCHEMA.safeParse(
            SEARCH_PARAMS.get(SEARCH_PARAMS_KEYS.initialAction) || undefined
        ).data || "signIn";

    const AUTH = useAuthenticator();

    useEffect(() => {
        // Set the authenticator to the action from the URL
        if (ACTION === "signUp") {
            AUTH.toSignUp();
        } else {
            AUTH.toSignIn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ACTION]);

    if (AUTH.authStatus === "configuring") {
        // Return null if the authenticator is still configuring
        return null;
    } else if (AUTH.authStatus === "authenticated") {
        // Redirect to the dashboard if authenticated
        return <Navigate to={SITE_MAP.dashboard()} replace={true} />;
    }

    return (
        <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
                <ThemeProvider theme={THEME}>
                    <Authenticator
                        signUpAttributes={["given_name", "family_name"]}
                        formFields={FORM_FIELDS}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
}
