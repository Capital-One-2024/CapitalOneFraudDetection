import React from "react";
import classNames from "classnames";

const welcomeDiv = classNames(
    "p-4",
    "rounded-lg",
    "border",
    "bg-gray-200",
    "animate-pulse",
    "shadow-md"
);

const welcomeInfo = classNames(
    "h-6",
    "bg-gray-300",
    "rounded",
    "w-1/4",
    "mb-2"
);

// eslint-disable-next-line
const WelcomeSkeleton: React.FC = () => {
    return (
        <div className={welcomeDiv}>
            <div className={welcomeInfo}>
            </div>
        </div>
    );
};

export default WelcomeSkeleton;
