import Page from "../components/Page";

import { useEffect, useState } from "react";

import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function DashboardPage() {
    const { user } = useAuthenticator();

    const [transactions, setTransactions] = useState<Array<Schema["Transaction"]["type"]>>([]);

    useEffect(() => {
        if (user) {
            console.log(user.userId);

            client.models.Transaction.observeQuery().subscribe({
                next: (data) => setTransactions([...data.items]),
            });
        }
    }, [user]);

    function createTransaction() {
        client.models.Transaction.create({
            userID: user.userId,
            vendor: "Chipotle",
            category: "Food",
            amount: 25000,
            latitude: 20,
            longitude: 20,
            isFraudulent: false,
            isUserValidated: false,
        });
    }

    return (
        <Page title="Dashboard" isProtected={true}>
            <h1>Dashboard</h1>
            <button onClick={createTransaction}>+ new</button>
            <table>
                <tr>
                    <th>UserID</th>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Location</th>
                    <th>isFraudulent</th>
                    <th>isUserValidated</th>
                </tr>

                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.userID}</td>
                        <td>{transaction.vendor}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.latitude}, {transaction.longitude}</td>
                        <td>{transaction.isFraudulent ? "Yes" : "No"}</td>
                        <td>{transaction.isUserValidated ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </table>
        </Page>
    );
}

export default DashboardPage;
