import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import { SITE_MAP } from "../lib/constants";

interface NavbarProps {
    variant?: "loggedOut" | "loggedIn";
}

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

export default function Navbar({ variant = "loggedOut" }: NavbarProps) {
    return (
        <nav
            className={classNames(
                "flex justify-between items-center sticky px-5 z-50",
                "w-full top-0 border-b-4 border-b-c1-blue bg-white"
            )}
        >
            <div className="flex items-center gap-4">
                <Link to="/">
                    <img src="/logo.svg" alt="Capital One" className="h-20 w-40" />
                </Link>
                {variant === "loggedIn" && (
                    <>
                        <div className="bg-c1-blue w-1 h-10 rounded-lg"></div>
                        <div className="flex items-center gap-5">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        classNames("text-gray-500 font-medium text-base", {
                                            "!font-bold !text-c1-blue": isActive,
                                        })
                                    }
                                >
                                    {link.title}
                                </NavLink>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="flex">
                {variant === "loggedIn" ? (
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            classNames("btn btn-blue", {
                                "!font-bold": isActive,
                            })
                        }
                    >
                        Profile
                    </NavLink>
                ) : (
                    <Link to={SITE_MAP.auth({ initialAction: "signIn" })} className="btn btn-blue">
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
