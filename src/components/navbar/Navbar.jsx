import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full px-6 border border-gray-100 hidden sm:block">
            <div className="max-w-6xl h-20 mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold">House.</h1>
                <ul className="flex gap-x-8 text-sm">
                    <li
                        className="cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Explore
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => navigate("/offers")}
                    >
                        Offers
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => navigate("/profile")}
                    >
                        Profile
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
