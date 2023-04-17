import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import MobileNavbar from "./components/navbar/MobileNavbar";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import UserListings from "./pages/UserListings";
import EditListing from "./pages/EditListing";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <div className="relative w-full mx-auto px-6">
                    <div className="max-w-6xl mx-auto py-8 pb-28 bg-white">
                        <Routes>
                            <Route path="/" element={<Explore />} />
                            <Route path="/offers" element={<Offers />} />
                            <Route
                                path="/category/:categoryName"
                                element={<Category />}
                            />
                            <Route path="/profile" element={<PrivateRoute />}>
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="/create-listing"
                                element={<CreateListing />}
                            />
                            <Route
                                path="/category/:categoryName/:listingId"
                                element={<Listing />}
                            />
                            <Route
                                path="/contact/:landlordId"
                                element={<Contact />}
                            />
                            <Route
                                path="/user-listings"
                                element={<UserListings />}
                            />
                            <Route
                                path="/edit-listing/:listingId"
                                element={<EditListing />}
                            />
                        </Routes>
                    </div>
                </div>
                <MobileNavbar />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
