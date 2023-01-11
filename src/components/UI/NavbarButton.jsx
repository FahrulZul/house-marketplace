import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarButton = ({ icon, path, text }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathMatchRoute = (pathName) => {
        if (pathName === location.pathname) {
            return true;
        }
    };

    const handleOnClick = () => {
        navigate(path);
    };

    return (
        <div
            className={`cursor-pointer flex flex-col w-14 duration-300 py-3 ${
                pathMatchRoute(path)
                    ? "text-gray-900 border-t-2 border-gray-900"
                    : "text-gray-400 border-t-2 border-white"
            }`}
            onClick={handleOnClick}
        >
            <div className="flex justify-center mb-1">{icon}</div>
            <p className="text-xs text-center">{text}</p>
        </div>
    );
};

export default NavbarButton;
