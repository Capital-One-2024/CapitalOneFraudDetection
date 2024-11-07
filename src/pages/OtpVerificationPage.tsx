import { Link } from "react-router-dom";
import Page from "../components/Page";
import { ArrowBack } from "@mui/icons-material";
import OtpForm from "../components/OtpForm";
import classNames from "classnames";

export default function OtpVerificationPage() {
    return (
        <Page title="Account Verification">
            <div className="flex flex-1 flex-col bg-c1-red bg-opacity-10">
                {/* The Centered Container */}
                <div
                    className={classNames(
                        "flex flex-1 flex-col bg-c1-red w-[95%] self-center py-12 p-5",
                        "md:w-6/12"
                    )}
                >
                    {/* Back to login page */}
                    <div className="flex">
                        <Link to={"/login"} className="text-white text-lg font-semibold">
                            <ArrowBack /> Back
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center mb-32">
                        <OtpForm />
                    </div>
                </div>
            </div>
        </Page>
    );
}
