import { useEffect, useState } from "react";
import Page from "../components/Page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import { TRANSACTION_SCHEMA } from "../lib/schemas";
import { z } from "zod";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import NewTransactionPopup from "../components/NewTransactionPopUp";
import { formatDate } from "../lib/utils";
import classNames from "classnames";

const client = generateClient<Schema>();

type TransactionInputs = z.infer<typeof TRANSACTION_SCHEMA>;

const vendors = [
    { name: "Uber", category: "Transport" },
    { name: "Lyft", category: "Transport" },
    { name: "Amazon", category: "Retail" },
    { name: "Walmart", category: "Retail" },
    { name: "Starbucks", category: "Food" },
    { name: "Chipotle", category: "Food" },
    { name: "McDonald's", category: "Food" },
    { name: "Tuition", category: "Education" },
    { name: "Campus Bookstore", category: "Books" },
    { name: "Local Bar", category: "Entertainment" },
    { name: "Gym", category: "Fitness" },
    { name: "Electric Company", category: "Utilities" },
    { name: "Water Supplier", category: "Utilities" },
    { name: "Internet Provider", category: "Bills" },
    { name: "Phone Carrier", category: "Bills" },
    { name: "Landlord", category: "Rent" },
    { name: "Property Management", category: "Rent" },
];

export default function NewTransactionPage() {
    const { user } = useAuthenticator();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [hasLocationAccess, setHasLocationAccess] = useState(true);

    const [accounts, setAccounts] = useState<Array<Schema["Account"]["type"]>>([]);

    // Obtain user position
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                    setHasLocationAccess(false); // SET location access to false if error occurs
                }
            );
        } else {
            // console.error("Geolocation is not supported by this browser.");
            setHasLocationAccess(false);
        }

        // get accounts associated with this user
        client.models.Account.observeQuery().subscribe({
            next: (data) => {
                setAccounts(data.items); // once everything is loaded, loading will stop
            },
            error: (err) => {
                console.error(err);
            },
        });
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TransactionInputs>({
        resolver: zodResolver(TRANSACTION_SCHEMA),
        defaultValues: {
            amount: undefined,
            vendor: "",
            accountID: "",
        },
    });

    const ON_SUBMIT = async (data: TransactionInputs) => {
        try {
            setIsLoading(true);
            const [vendor, category] = data.vendor.split("|");
            // Fetch the selected account
            const account = accounts.find((acc) => acc.id === data.accountID);
            if (!account) {
                setIsLoading(false);
                setShowFailure(true);
                return;
            }

            // Ensure balance is defined
            if (account.balance === null || account.balance === undefined) {
                setIsLoading(false);
                setShowFailure(true);
                return;
            }

            // Ensure sufficient balance
            if (account.balance < data.amount) {
                setIsLoading(false);
                setShowFailure(true);
                return;
            }
            const updatedBalance = account.balance - data.amount; // updated balance
            await client.models.Transaction.create({
                userID: user.userId,
                accountID: data.accountID,
                vendor: vendor,
                category: category,
                amount: data.amount,
                latitude: latitude,
                longitude: longitude,
                isFraudulent: false,
                isUserValidated: false,
            });
            await client.models.Account.update({
                id: data.accountID,
                balance: updatedBalance,
            });

            setIsLoading(false);
            setShowSuccess(true);
            reset();
        } catch (error) {
            console.error("Error with transaction:", error);
            setIsLoading(false);
            setShowFailure(true);
            reset();
        }
    };

    // Display location requirement
    if (!hasLocationAccess) {
        return (
            <Page title="New Transaction" isProtected={true}>
                <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold text-c1-blue">Location Access Required</h2>
                    <p className="text-lg text-gray-600 mt-4">
                        Please enable location access in your browser settings to use this form.
                    </p>
                </div>
            </Page>
        );
    }

    // Display loading location
    if (longitude === null || latitude === null) {
        return (
            <Page title="New Transaction" isProtected={true}>
                <div className="text-center mt-10">
                    <CircularProgress />
                    <p className="text-lg text-gray-600 mt-4">Fetching your location...</p>
                </div>
            </Page>
        );
    }
    if (accounts === null || (accounts && accounts.length === 0)) {
        return (
            <Page title="New Transaction" isProtected={true}>
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-600 mt-4">
                        You need to create a bank account first before creating a transaction...
                    </p>
                </div>
            </Page>
        );
    }

    // Display new transaction form
    return (
        <Page title="New Transaction" isProtected={true}>
            <div
                className={classNames(
                    "flex-1 flex flex-col-reverse items-center",
                    "justify-center p-5"
                )}
            >
                <form
                    onSubmit={handleSubmit(ON_SUBMIT)}
                    className={classNames(
                        "sm:w-3/5 w-full bg-red p-5 ",
                        "border border-2 border-c1-blue rounded-xl"
                    )}
                >
                    <div className="mb-8 text-center text-c1-blue text-xl">
                        Create New Transaction
                    </div>
                    <div className="mb-3">
                        Date & Time:
                        <div className="w-full p-2 my-1 border border-1 border-c1-blue rounded-md">
                            {formatDate(new Date())}
                        </div>
                    </div>

                    <div className="mb-2">
                        Account:
                        <select
                            id="accountID"
                            {...register("accountID")}
                            className="w-full p-2 my-1 border border-1 border-c1-blue rounded-md"
                        >
                            <option value="" disabled>
                                Select an account
                            </option>
                            {accounts.map((account, index) => (
                                <option key={index} value={account.id}>
                                    {account.accountName}
                                </option>
                            ))}
                        </select>
                        {errors.accountID && (
                            <p className="text-red-500">{errors.accountID.message}</p>
                        )}
                    </div>

                    <div className="mb-2">
                        Vendor:
                        <select
                            id="vendor"
                            {...register("vendor")}
                            className="w-full p-2 my-1 border border-1 border-c1-blue rounded-md"
                        >
                            <option value="" disabled>
                                Select a vendor
                            </option>
                            {vendors.map((v) => (
                                <option key={v.name} value={`${v.name}|${v.category}`}>
                                    {v.name} ({v.category})
                                </option>
                            ))}
                        </select>
                        {errors.vendor && <p className="text-red-500">{errors.vendor.message}</p>}
                    </div>

                    <div className="mb-2">
                        Amount:
                        <input
                            type="text"
                            {...register("amount")}
                            placeholder="Enter Dollar Amount"
                            className="w-full p-2 my-1 border border-1 border-c1-blue rounded-md"
                        />
                        {errors.amount && <p className="text-red-500">{errors.amount?.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading} // Disable button during loading
                        className="w-full border bg-c1-blue p-2 text-white rounded-lg"
                    >
                        {isLoading ? (
                            <div className="flex justify-center">
                                <CircularProgress size={25} />
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>
            </div>

            <NewTransactionPopup
                show={showSuccess}
                type="success"
                message="Your transaction was successfully submitted."
                onClose={() => setShowSuccess(false)}
            />
            <NewTransactionPopup
                show={showFailure}
                type="failure"
                message="Your transaction was unable to be submitted."
                onClose={() => setShowFailure(false)}
            />
        </Page>
    );
}
