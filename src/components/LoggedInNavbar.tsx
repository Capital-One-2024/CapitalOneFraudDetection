import { Divider } from "@mui/material";
import { signOut } from "aws-amplify/auth";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
    {
        title: "Dashboard",
        to: "/dashboard",
    },
    {
        title: "New Transaction",
        to: "/new-transaction",
    },
];

export default function LoggedInNavbar() {
    return (
        <nav
            className={classNames(
                "flex justify-between items-center bg-c1-blue p-5 sticky z-50",
                "w-full top-0 border-b-2 border-b-c1-blue"
            )}
        >
            <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-semibold text-white">
                    Capital One
                </Link>
                <Divider orientation="vertical" flexItem className="bg-white rounded-lg w-1" />
                <div className="flex items-center gap-5">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                classNames("text-white font-normal text-lg", {
                                    "!font-bold": isActive,
                                })
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="flex gap-4">
                <button type="button" className="btn btn-white" onClick={() => signOut()}>
                    Sign Out
                </button>
            </div>
        </nav>
    );
}
