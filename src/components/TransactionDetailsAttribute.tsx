import React from "react";

type TransactionDetailsAttributeProps = {
    label: string;
    children: React.ReactNode;
};

export default function TransactionDetailsAttribute({
    label,
    children,
}: TransactionDetailsAttributeProps) {
    return (
        <div className="flex-1 flex w-full border border-c1-blue p-2 mb-2 rounded-lg">
            <div className="w-1/2 text-c1-blue">{label}:</div>
            <div className="w-1/2">{children}</div>
        </div>
    );
}
