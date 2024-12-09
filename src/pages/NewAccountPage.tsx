import { useState } from "react";
import Page from "../components/Page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCOUNT_SCHEMA } from "../lib/schemas";
import { z } from "zod";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import NewTransactionPopup from "../components/NewTransactionPopUp";
import classNames from "classnames";

const client = generateClient<Schema>();

type AccountInputs = z.infer<typeof ACCOUNT_SCHEMA>;

export default function NewAccountPage() {
    const { user } = useAuthenticator();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AccountInputs>({
        resolver: zodResolver(ACCOUNT_SCHEMA),
        defaultValues: {
            balance: undefined,
            accountName: "",
        },
    });

    const ON_SUBMIT = async (data: AccountInputs) => {
        try {
            setIsLoading(true);

            await client.models.Account.create({
                userId: user.userId,
                accountName: data.accountName,
                balance: data.balance,
            });

            setIsLoading(false);
            setShowSuccess(true);
            reset();
        } catch {
            setIsLoading(false);
            setShowFailure(true);
            reset();
        }
    };

    // Display new transaction form
    return (
        <Page title="New Account" isProtected={true}>
            <div
                className={classNames(
                    "flex-1 flex flex-col-reverse items-center",
                    "justify-center p-5"
                )}
            >
                <form
                    onSubmit={handleSubmit(ON_SUBMIT)}
                    className={classNames(
                        "sm:w-3/5 max-w-xl bg-red p-5 shadow-xl",
                        "border-2 border-c1-blue rounded-xl"
                    )}
                >
                    <div className="mb-8 text-center text-c1-blue text-xl">Create New Account</div>
                    <div className="mb-2">
                        Account Name:
                        <input
                            type="text"
                            id="accountName"
                            placeholder="Example: Checkings"
                            {...register("accountName")}
                            className="w-full p-2 my-1 border border-1 border-c1-blue rounded-md"
                        />
                        {errors.accountName && (
                            <p className="text-red-500">{errors.accountName.message}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        Balance:
                        <input
                            type="text"
                            {...register("balance")}
                            placeholder="Enter Dollar Amount"
                            className="w-full p-2 my-1 border border-1 border-c1-blue rounded-md"
                        />
                        {errors.balance && (
                            <p className="text-red-500">{errors.balance?.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading} // Disable button during loading
                        className="w-full border bg-c1-blue p-2 text-white rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <NewTransactionPopup
                show={showSuccess}
                type="success"
                message="Your account was created successfully."
                onClose={() => setShowSuccess(false)}
            />
            <NewTransactionPopup
                show={showFailure}
                type="failure"
                message="Your account could not be created."
                onClose={() => setShowFailure(false)}
            />
        </Page>
    );
}
