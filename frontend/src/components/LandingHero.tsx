import classNames from "classnames";
import { Link } from "react-router-dom";

interface LandingHeroProps {
    title: string;
    subtitle: string;
    background?: "default" | "red";
}

export default function LandingHero({ title, subtitle, background = "default" }: LandingHeroProps) {
    return (
        <div
            className={classNames(
                "flex-1 flex flex-col justify-center items-center gap-5 p-10 w-full",
                {
                    "bg-c1-red text-white": background === "red",
                }
            )}
        >
            <h1 className="text-xl lg:text-4xl font-semibold text-center">{title}</h1>
            <p className="text-base text-center">{subtitle}</p>
            <Link
                to="/signup"
                className={classNames("btn btn-wide", {
                    "btn-white": background === "red",
                    "btn-red": background !== "red",
                })}
            >
                Get Started
            </Link>
        </div>
    );
}
