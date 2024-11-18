import { useAuthenticator } from "@aws-amplify/ui-react";
import classNames from "classnames";
import useTitle from "../hooks/useTitle";
import AuthPage from "../pages/AuthPage";
import Navbar from "./Navbar";
import LoggedInNavbar from "./LoggedInNavbar";

interface PageProps {
    title?: string;
    orientation?: "horizontal" | "vertical";
    children: React.ReactNode;
    isProtected?: boolean;
}

export default function Page({
    title,
    orientation = "vertical",
    isProtected = false,
    children,
}: PageProps) {
    useTitle(title);
    const AUTH = useAuthenticator();

    if (isProtected && AUTH.authStatus !== "authenticated") {
        return <AuthPage />;
    }

    return (
        <>
            {AUTH.authStatus === "authenticated" ? <LoggedInNavbar /> : <Navbar />}
            <main
                className={classNames("flex-1 flex", {
                    "flex-col": orientation === "vertical",
                    "flex-row": orientation === "horizontal",
                })}
            >
                {children}
            </main>
        </>
    );
}
