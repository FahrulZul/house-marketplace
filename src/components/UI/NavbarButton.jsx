import React from "react";

const NavbarButton = ({ icon, pathMatchRoute, onClick }) => {
    return (
        <div
            className={`cursor-pointer flex flex-col w-14 duration-300 py-3 ${
                pathMatchRoute("/")
                    ? "text-gray-900 border-t-2 border-gray-900"
                    : "text-gray-400 border-t-2 border-white"
            }`}
            onClick={onClick}
        >
            <div className="flex justify-center mb-1">{icon}</div>
            <p className="text-xs text-center">Explore</p>
        </div>
    );
};

export default NavbarButton;
