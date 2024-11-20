import { AuthPageAction } from "./schemas";

export const HOW_IT_WORKS_STEPS = [
    {
        title: "Sign Up",
        description: "Start with a quick and straightforward sign-up process.",
    },
    {
        title: "Verify Account",
        description: "Securely verify your account to activate protection.",
    },
    {
        title: "Transaction Monitoring",
        description:
            "Our system continuously monitors transactions to understand spending patterns.",
    },
    {
        title: "Anomaly Detection",
        description:
            "AI flags unusual activity in real time, " +
            "identifying any out-of-the-ordinary transactions.",
    },
    {
        title: "Real-Time Alerts",
        description: "Receive immediate notifications when a suspicious transaction is detected.",
    },
    {
        title: "Your Account, Your Control",
        description: "Review flagged transactions and stay in charge of your security.",
    },
];

/**
 * The keys for the search parameters in the URL that the application uses.
 */
export const SEARCH_PARAMS_KEYS = {
    initialAction: "ia",
};

/**
 * Site map for the application.
 * This object contains functions that return the URL for a specific page in the application.
 * If a page requires parameters, the function will accept an object with the necessary parameters.
 * @example
 * SITE_MAP.landing() => "/"
 * SITE_MAP.auth() => "/auth"
 * SITE_MAP.auth({ initialAction: "signIn" }) => "/auth?ia=signIn"
 */
export const SITE_MAP = {
    landing: () => "/",
    dashboard: () => "/dashboard",
    auth: (params?: { initialAction?: AuthPageAction }) => {
        const PAGE_URL = new URL("/auth", window.location.origin);
        if (params?.initialAction) {
            PAGE_URL.searchParams.append(SEARCH_PARAMS_KEYS.initialAction, params.initialAction);
        }
        return PAGE_URL.toString();
    },
};
