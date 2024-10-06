import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
