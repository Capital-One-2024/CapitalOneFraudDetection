import { useState } from 'react';
import Page from "../components/Page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from '@mui/material/CircularProgress';
import { TRANSACTION_SCHEMA } from "../lib/schemas";
import { z } from 'zod';
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

type TransactionInputs = z.infer<typeof TRANSACTION_SCHEMA>;

interface Vendor {
    name: string;
    category: string;
}

const vendors: Vendor[] = [
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
    { name: "Property Management", category: "Rent" }
];

const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

export default function NewTransactionPage() {
    const { user } = useAuthenticator();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [longitude, setLongitude] = useState(43.0747688);
    const [latitude, setLatitude] = useState(-89.3947991);

    // Obtain user position (default to Madison if permission not allowed)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLongitude(position.coords.longitude);
                setLatitude(position.coords.latitude);
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }

    // Unpack form variables and functions
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TransactionInputs>({
        resolver: zodResolver(TRANSACTION_SCHEMA),
        defaultValues: {
            amount: "",
            vendor: "",
            datetime: new Date().toISOString()
        },
    });

    // Submit handler
    const ON_SUBMIT = async (data: TransactionInputs) => {
        try {
            setIsLoading(true);  // Start loading
            const [vendor, category] = data.vendor.split('|');
            client.models.Transaction.create({
                userID: user.userId,
                vendor: vendor,
                category: category,
                amount: data.amount,
                latitude: latitude,
                longitude: longitude,
                isFraudulent: false,
                isUserValidated: false,
            });
            setIsLoading(false); // Stop loading
            setShowSuccess(true); // Show success message
            reset(); // Reset form
            
        }
        catch (error) {
            setIsLoading(false); // Stop loading
            console.log('Unable to process transaction:', error)
            setShowFailure(true); // Show failure message
            reset(); // Reset form
        }
    };

    return (
        <Page title="New Transaction" isProtected={true}>
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-center text-c1-blue font-bold my-6 text-3xl">
                    New Transaction
                </h1>
                <form onSubmit={handleSubmit(ON_SUBMIT)} className="items-center flex flex-col justify-center">
                    <div className="space-y-8 w-full">
                        <div className="p-6 border-2 border-c1-blue rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start">
                            {/* "Date & Time" always on the left */}
                            <div className="pl-1 text-c1-blue w-full sm:w-auto sm:flex-1">
                                <h2 className="text-c1-blue text-xl font-bold text-left">Date & Time:</h2>
                            </div>
                            {/* Actual date centered on smaller screens, left-aligned on larger screens */}
                            <div className="text-c1-blue w-full sm:w-auto sm:flex-1 text-center sm:text-left">
                                <h2 className="text-c1-blue text-xl font-bold">
                                    {formatDate(new Date())}
                                </h2>
                            </div>
                        </div>

                        <div className="p-4 border-2 border-c1-blue rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between">
                            <div className="pl-3 text-c1-blue w-full sm:w-1/2 mb-4 sm:mb-0">
                                <h2 className="text-c1-blue w-full sm:w-1/2 text-xl font-bold">Vendor:</h2>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <select
                                    id="vendor"
                                    {...register("vendor")}
                                    defaultValue="" // Set the default value to an empty string
                                    className="w-full p-2 border-2 border-c1-blue rounded-md text-gray-500 invalid:text-gray-500"
                                >
                                    <option value="" disabled>
                                        Select a vendor
                                    </option>
                                    {vendors.map((v) => (
                                        <option key={v.name} value={`${v.name}|${v.category}`} className="text-black">
                                            {v.name} ({v.category})
                                        </option>
                                    ))}
                                </select>
                                {errors.vendor && <p className="text-red-500">{errors.vendor.message}</p>}
                            </div>
                        </div>

                        <div className="p-4 border-2 border-c1-blue rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between">
                            <div className="pl-3 text-c1-blue w-full sm:w-1/2 mb-4 sm:mb-0">
                                <h2 className="text-c1-blue w-1/2 text-xl font-bold">Amount:</h2>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <input
                                    {...register("amount")}
                                    type="string"
                                    className="w-full p-2 border-2 border-c1-blue rounded-md"
                                    placeholder="Enter dollar amount"
                                />
                                {errors.amount && (
                                    <p className="text-red-500">{errors.amount?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading} // Disable button during loading
                        className={`w-2/3 ${isLoading ? 'bg-gray-400' : 'bg-c1-blue'} text-white font-bold p-3 rounded-lg my-4 ${isLoading ? '' : 'hover:shadow-lg'}`}
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

            {/* Success Pop-Up */}
            {showSuccess && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-c1-blue text-xl font-bold">Success!</h2>
                        <p>Your transaction was successfully submitted.</p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="mt-4 px-4 py-2 bg-c1-blue text-white rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {/* Failure Pop-Up */}
            {showFailure && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-c1-red text-xl font-bold">Error!</h2>
                        <p>Your transaction was unable to be submitted.</p>
                        <button
                            onClick={() => setShowFailure(false)}
                            className="mt-4 px-4 py-2 bg-c1-red text-white rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Page>
    );
}
