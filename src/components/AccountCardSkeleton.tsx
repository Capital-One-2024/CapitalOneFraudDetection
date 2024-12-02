import React from "react";
import classNames from "classnames";

const skeletonClass = classNames(
    "flex",
    "justify-between",
    "items-center",
    "bg-gray-200",
    "animate-pulse",
    "shadow-md",
    "rounded-lg",
    "p-4",
    "border",
    "border-gray-300",
    "w-80"
);

const AccountCardSkeleton: React.FC = () => {
    return (
        <div className={skeletonClass}>
            <div className="flex flex-col gap-2 w-3/4">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default AccountCardSkeleton;
