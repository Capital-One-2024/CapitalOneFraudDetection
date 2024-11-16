import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import outputs from "../amplify_outputs.json";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

Amplify.configure(outputs);

function App() {
    return (
        <Authenticator.Provider>
            <Router>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    {/* Catch all route -> defaults to 404 page */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </Authenticator.Provider>
    );
}

export default App;
