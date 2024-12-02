// import Page from "../components/Page";
// import { useEffect, useState } from "react";
// import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
// import type { Schema } from "../../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import WelcomeSkeleton from "../components/WelcomeSkeleton";
// import TransactionsList from "../components/TransactionsList";

// const client = generateClient<Schema>();

// function DashboardPage() {
//     const { user } = useAuthenticator();
//     const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
//     const [loading, setLoading] = useState(true); // Step 1: Loading state

//     useEffect(() => {
//         if (user) {
//             console.log(user);

//             // gets user details for welcome section
//             fetchUserAttributes()
//                 .then((result) => {
//                     setUserDetails(result);
//                 })
//                 .catch((err) => console.error(err));

//             // Fetch transactions
//             client.models.Transaction.observeQuery().subscribe({
//                 next: () => {
//                     setLoading(false); // once everything is loaded, loading will stop
//                 },
//                 error: (err) => {
//                     console.error(err);
//                     setLoading(false); // Ensure loading ends even on error
//                 },
//             });
//         }
//     }, [user]);

//     return (
//         <Page title="Dashboard" isProtected={true}>
//             <div className="p-8 font-sans">
//                 {/* Welcome Section */}
//                 <div className="mb-8">
//                     {loading ? (
//                         <WelcomeSkeleton />
//                     ) : (
//                         <div className="p-4 rounded-lg border bg-c1-blue shadow-md">
//                             <h2 className="text-lg font-semibold text-white">
//                                 Welcome, {userDetails?.given_name} {userDetails?.family_name}!
//                             </h2>
//                         </div>
//                     )}
//                 </div>

//                 {/* Transactions Section */}
//                 <section>
//                     <h2 className="text-lg font-semibold mb-4">My Transactions</h2>
//                     <TransactionsList />
//                 </section>
//             </div>
//         </Page>
//     );
// }

// export default DashboardPage;



// import Page from "../components/Page";
// import { useEffect, useState } from "react";
// import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
// import type { Schema } from "../../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import WelcomeSkeleton from "../components/WelcomeSkeleton";
// import TransactionsList from "../components/TransactionsList";

// const client = generateClient<Schema>();

// type Account = {
//   id: string; // Ensure your schema includes an `id`
//   accountName: string | null;
//   balance: number | null;
// };

// function DashboardPage() {
//   const { user } = useAuthenticator();
//   const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [loading, setLoading] = useState(true); // Loading state for accounts and transactions

//   useEffect(() => {
//     if (user) {
//       console.log(user);

//       // Fetch user attributes for welcome section
//       fetchUserAttributes()
//         .then((result) => {
//           setUserDetails(result);
//         })
//         .catch((err) => console.error(err));

//       // Fetch accounts
//       client.models.Account.list({
//         filter: { userID: { eq: user.userId } },
//       })
//         .then((result) => {
//           setAccounts(result.data as Account[]); // Adjust to match your schema
//         })
//         .catch((err) => console.error("Error fetching accounts:", err));

//       // Fetch transactions
//       client.models.Transaction.observeQuery().subscribe({
//         next: () => {
//           setLoading(false); // Once everything is loaded, stop loading
//         },
//         error: (err) => {
//           console.error(err);
//           setLoading(false); // Ensure loading ends even on error
//         },
//       });
//     }
//   }, [user]);

//   return (
//     <Page title="Dashboard" isProtected={true}>
//       <div className="p-8 font-sans">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           {loading ? (
//             <WelcomeSkeleton />
//           ) : (
//             <div className="p-4 rounded-lg border bg-c1-blue shadow-md">
//               <h2 className="text-lg font-semibold text-white">
//                 Welcome, {userDetails?.given_name} {userDetails?.family_name}!
//               </h2>
//             </div>
//           )}
//         </div>

//         {/* Accounts Section */}
//         <section className="mb-8">
//           <h2 className="text-lg font-semibold mb-4">My Accounts</h2>
//           {accounts.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {accounts.map((account) => (
//                 <div
//                   key={account.id}
//                   className="border border-c1-blue rounded-lg p-4 shadow-sm"
//                 >
//                   <h3 className="font-semibold">{account.accountName || "Unnamed Account"}</h3>
//                   <p>Balance: ${account.balance?.toFixed(2) || "0.00"}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">No accounts found.</p>
//           )}
//         </section>

//         {/* Transactions Section */}
//         <section>
//           <h2 className="text-lg font-semibold mb-4">My Transactions</h2>
//           <TransactionsList />
//         </section>
//       </div>
//     </Page>
//   );
// }

// export default DashboardPage;


// import React, { useEffect, useState } from "react";
// import Page from "../components/Page";
// import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
// import type { Schema } from "../../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import WelcomeSkeleton from "../components/WelcomeSkeleton";
// import TransactionsList from "../components/TransactionsList";
// import AccountCardSkeleton from "../components/AccountCardSkeleton";

// const client = generateClient<Schema>();

// type Account = {
//     id: string;
//     accountName: string | null;
//     balance: number | null;
// };

// function DashboardPage() {
//     const { user } = useAuthenticator();
//     const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
//     const [accounts, setAccounts] = useState<Account[]>([]);
//     const [loading, setLoading] = useState(true); // Loading state for accounts and transactions

//     useEffect(() => {
//         if (user) {
//             console.log(user);

//             // Fetch user attributes for welcome section
//             fetchUserAttributes()
//                 .then((result) => {
//                     setUserDetails(result);
//                 })
//                 .catch((err) => console.error(err));

//             // Fetch accounts
//             client.models.Account.list({
//                 filter: { userID: { eq: user.userId } },
//             })
//                 .then((result) => {
//                     const fetchedAccounts = result.data as Account[];
//                     setAccounts(fetchedAccounts);
//                     setLoading(false);
//                 })
//                 .catch((err) => {
//                     console.error("Error fetching accounts:", err);
//                     setLoading(false);
//                 });
//         }
//     }, [user]);

//     return (
//         <Page title="Dashboard" isProtected={true}>
//             <div className="p-8 font-sans">
//                 {/* Welcome Section */}
//                 <div className="mb-8">
//                     {loading ? (
//                         <WelcomeSkeleton />
//                     ) : (
//                         <div className="p-4 rounded-lg border bg-c1-blue shadow-md">
//                             <h2 className="text-lg font-semibold text-white">
//                                 Welcome, {userDetails?.given_name} {userDetails?.family_name}!
//                             </h2>
//                         </div>
//                     )}
//                 </div>

//                 {/* Accounts Section */}
//                 <section className="mb-8">
//                     <h2 className="text-lg font-semibold mb-4">My Accounts</h2>
//                     {loading ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                             {[...Array(3)].map((_, index) => (
//                                 <AccountCardSkeleton key={index} />
//                             ))}
//                         </div>
//                     ) : accounts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                             {accounts.map((account) => (
//                                 <div
//                                     key={account.id}
//                                     className="border border-c1-blue rounded-lg p-4 shadow-sm"
//                                 >
//                                     <h3 className="font-semibold">
//                                         {account.accountName || "Unnamed Account"}
//                                     </h3>
//                                     <p>Balance: ${account.balance?.toFixed(2) || "0.00"}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                             {[...Array(3)].map((_, index) => (
//                                 <AccountCardSkeleton key={index} />
//                             ))}
//                         </div>
//                     )}
//                 </section>

//                 {/* Transactions Section */}
//                 <section>
//                     <h2 className="text-lg font-semibold mb-4">My Transactions</h2>
//                     <TransactionsList />
//                 </section>
//             </div>
//         </Page>
//     );
// }

// export default DashboardPage;


import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import WelcomeSkeleton from "../components/WelcomeSkeleton";
import TransactionsList from "../components/TransactionsList";
import AccountsList from "../components/AccountsList";

function DashboardPage() {
    const { user } = useAuthenticator();
    const [userDetails, setUserDetails] = useState<FetchUserAttributesOutput>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            console.log(user);

            // Fetch user attributes for welcome section
            fetchUserAttributes()
                .then((result) => setUserDetails(result))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user]);

    return (
        <Page title="Dashboard" isProtected={true}>
            <div className="p-8 font-sans">
                {/* Welcome Section */}
                <div className="mb-8">
                    {loading ? (
                        <WelcomeSkeleton />
                    ) : (
                        <div className="p-4 rounded-lg border bg-c1-blue shadow-md">
                            <h2 className="text-lg font-semibold text-white">
                                Welcome, {userDetails?.given_name} {userDetails?.family_name}!
                            </h2>
                        </div>
                    )}
                </div>

                {/* Accounts Section */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">My Accounts</h2>
                    <AccountsList /> {/* Embedded AccountsList without Page */}
                </section>

                {/* Transactions Section */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">My Transactions</h2>
                    <TransactionsList />
                </section>
            </div>
        </Page>
    );
}

export default DashboardPage;
