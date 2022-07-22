import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Router>
                <div className="max-w-md mx-auto">
                    <div className="container min-h-screen mx-auto p-8">
                        <Routes>
                            <Route path="/" element={<Explore />} />
                            <Route path="/offers" element={<Offers />} />
                            <Route path="/profile" element={<SignIn />} />
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                        </Routes>
                    </div>
                    <Navbar />
                </div>
            </Router>
        </>
    );
}

export default App;
