import { useState } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
            <h1 className="text-gray-900 text-3xl font-bold mb-10">Welcome!</h1>

            <div className="flex justify-between mb-3">
                <p>Personal Details</p>
                <button
                    className="font-medium text-sky-600"
                    onClick={() => {
                        changeDetails && onSubmit();
                        setChangeDetails((prevState) => !prevState);
                    }}
                >
                    {changeDetails ? "Save" : "Edit"}
                </button>
            </div>

            <form className="mb-10 p-3 bg-white rounded-lg shadow">
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
                                    className={`w-full px-2 py-1 bg-white border ${
                                        changeDetails
                                            ? "border-gray-200"
                                            : "border-gray-50"
                                    } rounded focus:outline-sky-200`}
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
                                            : "border-gray-50"
                                    } rounded focus:outline-sky-200`}
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

            <button className="font-bold text-red-500" onClick={onLogOut}>
                Logout
            </button>
        </div>
    );
}

export default Profile;
