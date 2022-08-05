import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiDollarSign, FiChevronRight, FiLogOut } from "react-icons/fi";
import { BsHouse } from "react-icons/bs";

function Profile() {
    const auth = getAuth();
    const [changeDetails, setChangeDetails] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;

    const navigate = useNavigate();

    const onLogOut = () => {
        auth.signOut();
        navigate("/");
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = async () => {
        const auth = getAuth();
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });

                const userRef = doc(db, "users", auth.currentUser.uid);
                //update in firestore
                updateDoc(userRef, {
                    name,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Update Failed");
        }
    };

    return (
        <div className="text-sm">
            <h1 className="text-gray-900 text-base font-semibold text-center mb-10">
                Profile
            </h1>

            <div className="flex justify-between mb-3">
                <p className="font-medium">Personal Details</p>
                <button
                    className="font-medium text-indigo-600"
                    onClick={() => {
                        changeDetails && onSubmit();
                        setChangeDetails((prevState) => !prevState);
                    }}
                >
                    {changeDetails ? "Save" : "Edit"}
                </button>
            </div>

            <form className="mb-10 p-3 rounded-lg shadow bg-white">
                <table className="border-collapse w-full">
                    <tbody>
                        <tr>
                            <td className="pr-3 pb-2">
                                <label className="font-medium" htmlFor="name">
                                    Name :
                                </label>
                            </td>
                            <td className="pb-2">
                                <input
                                    className={`w-full px-2 py-1 border bg-white ${
                                        changeDetails
                                            ? "border-gray-200"
                                            : "border-white"
                                    } rounded focus:outline-indigo-200`}
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={onChange}
                                    disabled={!changeDetails}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-3">
                                <label className="font-medium" htmlFor="email">
                                    Email :
                                </label>
                            </td>
                            <td>
                                <input
                                    className={`w-full px-2 py-1 bg-white border ${
                                        changeDetails
                                            ? "border-gray-200"
                                            : "border-white"
                                    } rounded focus:outline-indigo-200`}
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={onChange}
                                    disabled={true}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <Link
                to="/create-listing"
                className="shadow bg-white rounded-md px-3 py-3 flex justify-between items-center mb-3"
            >
                <div className="flex items-center">
                    <FiDollarSign size={16} className="mr-3 text-indigo-600" />
                    <span>Sell or rent your home</span>
                </div>
                <FiChevronRight size={17} />
            </Link>

            <Link
                to={`/user-listings`}
                className="shadow bg-white rounded-md px-3 py-3 flex justify-between items-center mb-3"
            >
                <div className="flex items-center">
                    <BsHouse size={16} className="mr-3 text-indigo-600" />
                    <span>Your Listings</span>
                </div>
                <FiChevronRight size={17} />
            </Link>

            <div
                className="shadow bg-white rounded-md px-3 py-3 flex justify-between items-center"
                onClick={onLogOut}
            >
                <div className="flex items-center">
                    <FiLogOut size={16} className="mr-3 text-indigo-600" />
                    <span>Logout</span>
                </div>
                <FiChevronRight size={17} />
            </div>
        </div>
    );
}

export default Profile;
