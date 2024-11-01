import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Page from "../components/Page";
import classNames from "classnames";

export default function NotFoundPage() {
    return (
        <Page title="Not Found">
            <Navbar />
            <div
                className={classNames(
                    "flex-1 flex flex-col-reverse items-center",
                    "justify-center mb-32 gap-10 p-5",
                    "md:flex-row md:justify-between md:mb-0"
                )}
            >
                <div className="md:flex-1 flex flex-col justify-center items-center gap-3">
                    <h1 className="font-bold text-5xl text-center md:text-7xl">Uh-Oh!</h1>
                    <p className="font-medium text-lg text-center md:text-2xl">
                        We could not find the page you are looking for.
                    </p>
                    <Link to="/" className="btn btn-red btn-wide">
                        Go back to homepage
                    </Link>
                </div>
                <div className="md:flex-1 flex items-center justify-center">
                    <img src="/not-found.svg" alt="404" className="w-72 md:w-[500px]" />
                </div>
            </div>
        </Page>
    );
}
