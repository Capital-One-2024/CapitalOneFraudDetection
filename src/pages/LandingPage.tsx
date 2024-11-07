import classNames from "classnames";
import HowItWorks from "../components/HowItWorks";
import LandingHero from "../components/LandingHero";
import Navbar from "../components/Navbar";
import Page from "../components/Page";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

function LandingPage() {
    return (
        <Page title="Protect Your Finances">
            <Navbar />
            {/* Hero Part */}
            <div
                className={classNames(
                    "flex-1 flex flex-col min-h-screen items-center justify-center",
                    "gap-24"
                )}
            >
                <LandingHero
                    title="Secure Transactions, Simplified"
                    subtitle={
                        "AI-powered fraud detection tailored for university " +
                        "students—designed to protect what matters most."
                    }
                />
                <KeyboardDoubleArrowDownIcon
                    fontSize="large"
                    className={classNames("animate animate-bounce mb-12 text-c1-red")}
                />
            </div>
            {/* Body */}
            <div className="flex-1 flex flex-col items-center gap-10">
                <HowItWorks />
                <LandingHero
                    title="Create an Account"
                    subtitle="Join other students protecting their finances effortlessly."
                    background="red"
                />
            </div>
        </Page>
    );
}

export default LandingPage;
