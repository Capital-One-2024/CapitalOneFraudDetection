import { Authenticator } from "@aws-amplify/ui-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

function App() {
    return (
        <Authenticator.Provider>
            <Router>
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    {/* Catch all route -> defaults to 404 page */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </Authenticator.Provider>
    );
}

export default App;
