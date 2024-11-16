// temporary dummy data for testing
const transactions = [
    {
        id: "1",
        account: "CHECKING xxxx1234",
        vendor: "Amazon",
        date: "Nov 8, 2024 at 10:00 am",
        amount: -142.42,
    },
    {
        id: "2",
        account: "CHECKING xxxx1234",
        vendor: "Lyft",
        date: "Nov 8, 2024 at 9:00 am",
        amount: -17.23,
    },
    {
        id: "3",
        account: "CHECKING xxxx1234",
        vendor: "Door Dash",
        date: "Nov 5, 2024 at 6:40 pm",
        amount: -22.83,
    },
    {
        id: "4",
        account: "CHECKING xxxx1234",
        vendor: "Subway",
        date: "Nov 2, 2024 at 2:23 pm",
        amount: -18.29,
    },
];

// temporarely dummy user for testing
export default function Dashboard() {
    return (
        <div className="p-8">
            {/* Greeting Section */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-2xl font-bold">Welcome, Jane Doe!</h1>
                <div className="mt-4">
                    <h2 className="text-lg">Capital One</h2>
                    <h3 className="text-xl font-medium">CHECKING ACCOUNT</h3>
                    <p className="text-3xl font-semibold mt-2">$541.12</p>
                </div>
            </div>

            {/* Transactions Section */}
            <div>
                <h2 className="text-xl font-bold mb-4">My Transactions</h2>
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
                        >
                            <div>
                                <p className="font-medium">{transaction.account}</p>
                                <p className="text-sm text-gray-500">{transaction.vendor}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                            </div>
                            <div className="text-red-600 text-lg font-bold">
                                {transaction.amount.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
