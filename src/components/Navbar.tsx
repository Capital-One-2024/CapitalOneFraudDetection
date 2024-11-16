import classNames from "classnames";
import { Link } from "react-router-dom";
import { SITE_MAP } from "../lib/constants";

export default function Navbar() {
    return (
        <nav
            className={classNames(
                "flex justify-between items-center bg-c1-blue p-5 sticky z-50",
                "w-full top-0 border-b-2 border-b-c1-blue"
            )}
        >
            <Link to="/" className="text-2xl font-semibold text-white">
                Capital One
            </Link>
            <div className="flex gap-4">
                <Link to={SITE_MAP.auth({ initialAction: "signIn" })} className="btn btn-white">
                    Sign In
                </Link>
            </div>
        </nav>
    );
}
