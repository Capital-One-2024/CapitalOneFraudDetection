import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import NewTransactionPage from "./pages/NewTransactionPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NewAccountPage from "./pages/NewAccountPage";

Amplify.configure(outputs);

function App() {
    return (
        <Authenticator.Provider>
            <Router>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/new-transaction" element={<NewTransactionPage />} />
                    <Route path="/transaction-details" element={<TransactionDetailsPage />} />
                    <Route path="/new-account" element={<NewAccountPage />} />
                    {/* Catch all route -> defaults to 404 page */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </Authenticator.Provider>
    );
}

export default App;
