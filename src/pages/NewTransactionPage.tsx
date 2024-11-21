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
import { FORMATDATE } from "../lib/utils";

const CLIENT = generateClient<Schema>();

type TransactionInputs = z.infer<typeof TRANSACTION_SCHEMA>;

const VENDORS = [
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
    const [ISLOADING, SETISLOADING] = useState(false);
    const [SHOWSUCCESS, SETSHOWSUCCESS] = useState(false);
    const [SHOWFAILURE, SETSHOWFAILURE] = useState(false);
    const [LONGITUDE, SETLONGITUDE] = useState<number | null>(null);
    const [LATITUDE, SETLATITUDE] = useState<number | null>(null);
    const [HASLOCATIONACCESS, SETHASLOCATIONACCESS] = useState(true);

    // Obtain user position
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    SETLONGITUDE(position.coords.longitude);
                    SETLATITUDE(position.coords.latitude);
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                    SETHASLOCATIONACCESS(false); // SET location access to false if error occurs
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            SETHASLOCATIONACCESS(false);
        }
    }, []);

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
        },
    });

    const ON_SUBMIT = async (data: TransactionInputs) => {
        try {
            SETISLOADING(true);
            const [VENDOR, CATEGORY] = data.vendor.split("|");
            await CLIENT.models.Transaction.create({
                userID: user.userId,
                vendor: VENDOR,
                category: CATEGORY,
                amount: data.amount,
                LATITUDE: LATITUDE,
                LONGITUDE: LONGITUDE,
                isFraudulent: false,
                isUserValidated: false,
            });
            SETISLOADING(false);
            SETSHOWSUCCESS(true);
            reset();
        } catch (error) {
            SETISLOADING(false);
            console.log("Unable to process transaction:", error);
            SETSHOWFAILURE(true);
            reset();
        }
    };

    // Display location requirement
    if (!HASLOCATIONACCESS) {
        return (
            <Page title="New Transaction" isProtected={true}>
                <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold text-c1-blue">Location Access Required</h2>
                    <p className="text-lg text-gray-600 mt-4">
                        Please enable location access in your browser SETtings to use this form.
                    </p>
                </div>
            </Page>
        );
    }

    // Display loading location
    if (LONGITUDE === null || LATITUDE === null) {
        return (
            <Page title="New Transaction" isProtected={true}>
                <div className="text-center mt-10">
                    <CircularProgress />
                    <p className="text-lg text-gray-600 mt-4">Fetching your location...</p>
                </div>
            </Page>
        );
    }

    // Display new transaction form
    return (
        <Page title="New Transaction" isProtected={true}>
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-center text-c1-blue font-bold my-6 text-3xl">
                    New Transaction
                </h1>
                <form
                    onSubmit={handleSubmit(ON_SUBMIT)}
                    className={`
                    items-center 
                    flex 
                    flex-col 
                    justify-center
                `}
                >
                    <div className="space-y-8 w-full">
                        <div
                            className={`
                            p-6 border-2
                            border-c1-blue
                            rounded-lg
                            shadow-lg
                            flex
                            flex-col
                            sm:flex-row 
                            items-center
                            sm:items-start
                        `}
                        >
                            {/* "Date & Time" always on the left */}
                            <div className="pl-1 text-c1-blue w-full sm:w-auto sm:flex-1">
                                <h2 className="text-c1-blue text-xl font-bold text-left">
                                    Date & Time:
                                </h2>
                            </div>

                            <div
                                className={`
                                text-c1-blue w-full 
                                sm:w-auto 
                                sm:flex-1 
                                text-center 
                                sm:text-left
                            `}
                            >
                                <h2 className="text-c1-blue text-xl font-bold">
                                    {FORMATDATE(new Date())}
                                </h2>
                            </div>
                        </div>

                        <div
                            className={`
                                p-4 
                                border-2 
                                border-c1-blue 
                                rounded-lg 
                                shadow-lg 
                                flex 
                                flex-col 
                                sm:flex-row 
                                items-center 
                                justify-between
                            `}
                        >
                            <div className="pl-3 text-c1-blue w-full sm:w-1/2 mb-4 sm:mb-0">
                                <h2 className="text-c1-blue w-full sm:w-1/2 text-xl font-bold">
                                    Vendor:
                                </h2>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <select
                                    id="vendor"
                                    {...register("vendor")}
                                    defaultValue="" // SET the default value to an empty string
                                    className={`
                                        w-full 
                                        p-2 
                                        border-2 
                                        border-c1-blue 
                                        rounded-md 
                                        text-gray-500 
                                        invalid:text-gray-500
                                    `}
                                >
                                    <option value="" disabled>
                                        Select a vendor
                                    </option>
                                    {VENDORS.map((v) => (
                                        <option
                                            key={v.name}
                                            value={`${v.name}|${v.category}`}
                                            className="text-black"
                                        >
                                            {v.name} ({v.category})
                                        </option>
                                    ))}
                                </select>
                                {errors.vendor && (
                                    <p className="text-red-500">{errors.vendor.message}</p>
                                )}
                            </div>
                        </div>

                        <div
                            className={`
                            p-4 
                            border-2 
                            border-c1-blue 
                            rounded-lg 
                            shadow-lg 
                            flex
                            flex-col 
                            sm:flex-row 
                            items-center 
                            justify-between
                        `}
                        >
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
                        disabled={ISLOADING} // Disable button during loading
                        className={`
                            my-4
                            w-2/3 
                            btn
                            btn-blue 
                        `}
                    >
                        {ISLOADING ? (
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
                show={SHOWSUCCESS}
                type="success"
                message="Your transaction was successfully submitted."
                onClose={() => SETSHOWSUCCESS(false)}
            />
            <NewTransactionPopup
                show={SHOWFAILURE}
                type="failure"
                message="Your transaction was unable to be submitted."
                onClose={() => SETSHOWFAILURE(false)}
            />
        </Page>
    );
}
