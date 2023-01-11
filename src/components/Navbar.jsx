import { FiUser, FiCompass, FiTag } from "react-icons/fi";
import NavbarButton from "./UI/NavbarButton";

function Navbar() {
    return (
        <div className="max-w-md bg-white rounded-t-3xl w-full fixed z-10 bottom-0 flex justify-evenly drop-shadow-2xl">
            <NavbarButton
                icon={<FiCompass size={25} />}
                path="/"
                text="Explore"
            />
            <NavbarButton
                icon={<FiTag size={25} />}
                path="/offers"
                text="Offers"
            />
            <NavbarButton
                icon={<FiUser size={25} />}
                path="/profile"
                text="Profile"
            />
        </div>
    );
}

export default Navbar;
