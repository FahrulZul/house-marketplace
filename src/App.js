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
        // <div className="container mx-auto m-8 px-8 xl:px-24">
        //     <h1 className="text-indigo-400 text-xl font-bold">My App</h1>
        // </div>
        <>
            <Router>
                <div className="container min-h-screen mx-auto p-8 xl:px-24">
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
            </Router>
        </>
    );
}

export default App;
