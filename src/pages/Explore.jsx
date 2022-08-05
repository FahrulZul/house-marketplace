import { Link } from "react-router-dom";
import sellCategoryImage from "../assets/svg/sell.svg";
import rentCategoryImage from "../assets/svg/rent.svg";
import Slider from "../components/Slider";

function Explore() {
    return (
        <div className="text-sm">
            <h1 className="text-gray-900 text-base font-semibold text-center mb-10">
                Explore
            </h1>
            <Slider />
            <div className="flex mt-4">
                <Link
                    to="/category/sale"
                    className="flex-1 shadow rounded-xl p-4 mr-2 bg-white"
                >
                    <img
                        className="p-2 mb-2 h-28 w-full"
                        src={sellCategoryImage}
                        alt="House for sell"
                    />
                    <p className=" text-center font-medium">For Sale</p>
                </Link>
                <Link
                    to="/category/rent"
                    className="flex-1 shadow rounded-xl p-4 ml-2 bg-white"
                >
                    <img
                        className="p-2 mb-2 h-28 w-full"
                        src={rentCategoryImage}
                        alt="House for sell"
                    />
                    <p className=" text-center font-medium">For Rent</p>
                </Link>
            </div>
        </div>
    );
}

export default Explore;
