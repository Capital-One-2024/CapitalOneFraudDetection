import { useState } from "react";
import { confirmUserAttribute } from "aws-amplify/auth";
import classNames from "classnames";

interface ConfirmationProps {
    attributeKey: string;
    onClose: () => void;
    show: boolean;
}

export default function AttributeConfirmationPopUp({ onClose, show }: ConfirmationProps) {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleConfirmationCode = async () => {
        try {
            await confirmUserAttribute({
                userAttributeKey: "email",
                confirmationCode,
            });
            setConfirmationCode("");
            setError(null);
            onClose();
        } catch (error) {
            console.log("Error: ", error);
            setConfirmationCode("");
            setError("Invalid confirmation code. Please try again.");
        }
    };

    if (!show) return null;

    return (
        <div
            className={classNames(
                "fixed",
                "inset-0",
                "bg-black",
                "bg-opacity-50",
                "flex",
                "justify-center",
                "items-center",
                "z-50"
            )}
        >
            <div
                className={classNames(
                    "bg-white",
                    "p-6",
                    "rounded-lg",
                    "shadow-lg",
                    "w-full",
                    "max-w-md",
                    "mx-4",
                    "flex",
                    "flex-col",
                    "gap-4"
                )}
            >
                <div className="text-xl font-bold">Confirm Attribute Change</div>
                <div className="text-sm font-normal">
                    Please enter the confirmation code that was sent to you to confirm your change.
                </div>
                <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Enter confirmation code"
                    className="inputClass"
                />
                {error && <div className="mb-4 text-c1-red text-sm">{error}</div>}
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600">
                        Cancel
                    </button>
                    <button onClick={handleConfirmationCode} className="btn btn-blue">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
