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
    "border-gray-300"
);

// eslint-disable-next-line
const TransactionCardSkeleton: React.FC = () => {
    return (
        <div className={skeletonClass}>
            <div className="flex flex-col gap-2 w-3/4">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/5"></div>
            </div>
            <div className="h-5 bg-gray-300 rounded w-1/6"></div>
        </div>
    );
};

export default TransactionCardSkeleton;
