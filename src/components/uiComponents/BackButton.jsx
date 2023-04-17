import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(-1)}
            className="mr-6 p-1 rounded-full hover:bg-gray-100 cursor-pointer w-fit"
        >
            <FiChevronLeft
                size={25}
                className="text-zinc-600 -translate-x-[1px]"
            />
        </div>
    );
};

export default BackButton;
