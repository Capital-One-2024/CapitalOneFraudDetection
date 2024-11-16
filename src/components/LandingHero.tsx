import classNames from "classnames";
import { Link } from "react-router-dom";
import { SITE_MAP } from "../lib/constants";

interface LandingHeroProps {
    title: string;
    subtitle: string;
    background?: "default" | "blue";
}

export default function LandingHero({ title, subtitle, background = "default" }: LandingHeroProps) {
    return (
        <div
            className={classNames("flex flex-col justify-center items-center gap-5 p-10 w-full", {
                "bg-c1-blue text-white": background === "blue",
            })}
        >
            <h1 className="text-xl lg:text-4xl font-semibold text-center">{title}</h1>
            <p className="text-base text-center">{subtitle}</p>
            <Link
                to={SITE_MAP.auth({ initialAction: "signUp" })}
                className={classNames("btn btn-wide", {
                    "btn-white": background === "blue",
                    "btn-blue": background !== "blue",
                })}
            >
                Get Started
            </Link>
        </div>
    );
}
