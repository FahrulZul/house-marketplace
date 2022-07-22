import { useNavigate, useLocation } from "react-router-dom";
import { FiUser, FiCompass, FiTag } from "react-icons/fi";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const pathMatchRoute = (path) => {
        if (path === location.pathname) {
            return true;
        }
    };

    return (
        <div className="max-w-md bg-white rounded-t-3xl w-full fixed bottom-0 flex justify-evenly">
            <div
                className={`flex flex-col w-14 duration-300 py-3 ${
                    pathMatchRoute("/")
                        ? "text-gray-900 border-t-2 border-gray-900"
                        : "text-gray-400 border-t-2 border-white"
                }`}
                onClick={() => navigate("/")}
            >
                <div className="flex justify-center mb-1">
                    <FiCompass size={25} />
                </div>
                <p className="text-xs text-center">Explore</p>
            </div>
            <div
                className={`flex flex-col w-14 duration-300 py-3 ${
                    pathMatchRoute("/offers")
                        ? "text-gray-900 border-t-2 border-gray-900"
                        : "text-gray-400 border-t-2 border-white"
                }`}
                onClick={() => navigate("/offers")}
            >
                <div className="flex justify-center mb-1">
                    <FiTag size={25} />
                </div>
                <p className="text-xs text-center">Offer</p>
            </div>
            <div
                className={`flex flex-col w-14 duration-300 py-3 ${
                    pathMatchRoute("/profile")
                        ? "text-gray-900 border-t-2 border-gray-900"
                        : "text-gray-400 border-t-2 border-white"
                }`}
                onClick={() => navigate("/profile")}
            >
                <div className="flex justify-center mb-1">
                    <FiUser size={25} />
                </div>
                <p className="text-xs text-center">Profile</p>
            </div>
        </div>
    );
}

export default Navbar;
