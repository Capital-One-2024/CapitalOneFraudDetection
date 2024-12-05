import classNames from "classnames";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { updateUserAttribute } from "aws-amplify/auth";
import type { UpdateUserAttributeOutput } from "aws-amplify/auth";
import AttributeConfirmationPopUp from "../components/AttributeConfirmationPopUp";

interface ProfileDetailProps {
    description: string;
    attributeKey: string;
    attribute: string;
    onUpdateComplete: () => void;
}

const cardClass = classNames(
    "flex",
    "flex-col", // Stack vertically on small screens
    "sm:flex-row", // Side by side on larger screens
    "gap-4", // Add gap between stacked elements
    "bg-white",
    "shadow-md",
    "rounded-lg",
    "p-4", // Reduced padding for small screens
    "sm:p-8", // Original padding for larger screens
    "border",
    "border-gray-200",
    "w-full",
    "text-xl",
    "text-left",
    "font-semibold",
    "justify-center"
);

export default function ProfileDetail({
    description,
    attributeKey,
    attribute,
    onUpdateComplete,
}: ProfileDetailProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(attribute);
    const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateAttribute = async () => {
        try {
            if (editValue.length === 0) {
                throw new Error;
            }
            const output = await updateUserAttribute({
                userAttribute: {
                    attributeKey,
                    value: editValue,
                },
            });
            handleNextSteps(output);
        } catch (error) {
            setError("Invalid attribute entry, please try again.");
            console.log("Failed to update attribute:", error);
        }
    };

    const handleNextSteps = (output: UpdateUserAttributeOutput) => {
        const { nextStep } = output;
        switch (nextStep.updateAttributeStep) {
            case "CONFIRM_ATTRIBUTE_WITH_CODE":
                setIsConfirmationRequired(true);
                break;
            case "DONE":
                handleDone();
                break;
        }
    };

    const handleDone = () => {
        setError(null);
        setIsConfirmationRequired(false);
        setIsEditing(false);
        onUpdateComplete();
    };

    const handleCancel = () => {
        setError(null);
        setEditValue(attribute);
        setIsEditing(false);
    };

    return (
        <div className={cardClass}>
            <div className="sm:w-1/2 flex items-center">{description}</div>
            <div className="sm:w-1/2 flex-1 items-center">
                {isEditing ? (
                    <div className="w-full flex items-center gap-2 font-normal">
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUpdateAttribute();
                                }
                            }}
                            className="inputClass flex-1 min-w-0"
                        />
                        <div className="flex gap-2 shrink-0">
                            <button
                                onClick={handleUpdateAttribute}
                                className="text-green-600"
                                aria-label="Save"
                            >
                                <CheckIcon />
                            </button>
                            <button
                                onClick={handleCancel}
                                className="text-c1-red"
                                aria-label="Cancel"
                            >
                                <ClearIcon />
                            </button>

                        </div>

                    </div>
                ) : (
                    <div className="w-full flex items-center gap-2">
                        <div className="font-normal truncate flex-1">{attribute}</div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="shrink-0"
                            aria-label="Edit"
                        >
                            <EditIcon />
                        </button>
                    </div>
                )}
                {error && <div className="text-c1-red text-sm">{error}</div>}
            </div>
            <AttributeConfirmationPopUp
                show={isConfirmationRequired}
                onClose={handleDone}
            />
        </div>
    );
}
