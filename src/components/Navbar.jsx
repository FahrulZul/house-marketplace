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
        <div className="bg-white rounded-t-3xl w-full fixed bottom-0 flex justify-evenly">
            <div
                className={`flex flex-col w-14 duration-300 py-4 ${
                    pathMatchRoute("/")
                        ? "text-neutral-600 border-t-2 border-neutral-600"
                        : "text-neutral-400 border-t-2 border-white"
                }`}
                onClick={() => navigate("/")}
            >
                <div className="flex justify-center mb-1">
                    <FiCompass size={27} />
                </div>
                <p className="text-sm font-bold text-center">Explore</p>
            </div>
            <div
                className={`flex flex-col w-14 duration-300 py-4 ${
                    pathMatchRoute("/offers")
                        ? "text-neutral-600 border-t-2 border-neutral-600"
                        : "text-neutral-400 border-t-2 border-white"
                }`}
                onClick={() => navigate("/offers")}
            >
                <div className="flex justify-center mb-1">
                    <FiTag size={27} />
                </div>
                <p className="text-sm font-bold text-center">Offer</p>
            </div>
            <div
                className={`flex flex-col w-14 duration-300 py-4 ${
                    pathMatchRoute("/profile")
                        ? "text-neutral-600 border-t-2 border-neutral-600"
                        : "text-neutral-400 border-t-2 border-white"
                }`}
                onClick={() => navigate("/profile")}
            >
                <div className="flex justify-center mb-1">
                    <FiUser size={27} />
                </div>
                <p className="text-sm font-bold text-center">Profile</p>
            </div>
        </div>
    );
}

export default Navbar;
