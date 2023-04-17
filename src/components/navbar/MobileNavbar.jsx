import { FiUser, FiCompass, FiTag } from "react-icons/fi";
import NavbarButton from "../ui/NavbarButton";

function MobileNavbar() {
    return (
        <div className="bg-white rounded-t-3xl w-full fixed z-20 bottom-0 flex justify-evenly drop-shadow-2xl sm:hidden">
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

export default MobileNavbar;
