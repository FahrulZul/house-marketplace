import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FiAtSign, FiLock, FiEyeOff, FiEye, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
    });

    const { email, name, password } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // await updateProfile(auth.currentUser, {
            //     displayName: name,
            // });

            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, "users", user.uid), formDataCopy);

            navigate("/");
        } catch (error) {
            toast.error("Something went bad with the registration.");
        }

        updateProfile();
    };

    return (
        <div className="bg-white rounded-2xl ">
            <h1 className="text-gray-900 text-3xl font-bold mb-10">Sign up</h1>

            <form className="mb-6" onSubmit={onSubmit}>
                <div className="flex items-start mb-5">
                    <FiAtSign size={20} className="text-gray-400 mr-4" />
                    <div className="flex flex-1 items-center border-b border-gray-200 pb-2">
                        <input
                            className="w-full text-sm focus:outline-none"
                            type="email"
                            id="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email ID"
                        />
                    </div>
                </div>

                <div className="flex items-start mb-5">
                    <FiUser size={20} className="text-gray-400 mr-4" />
                    <div className="flex flex-1 items-center border-b border-gray-200 pb-2">
                        <input
                            className="text-sm w-full focus:outline-none"
                            type="text"
                            id="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Full name"
                        />
                    </div>
                </div>

                <div className="flex items-start mb-10">
                    <FiLock size={20} className="text-gray-400 mr-4" />
                    <div className="flex flex-1 items-center border-b border-gray-200 pb-2">
                        <input
                            className="w-full flex-1 text-sm focus:outline-none"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                        />
                        <div
                            className="mr-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FiEye className="text-gray-500" />
                            ) : (
                                <FiEyeOff className="text-gray-400" />
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 w-full text-sm font-semibold text-white py-3 rounded-xl"
                >
                    Register
                </button>
            </form>

            <div className="relative w-full flex justify-center text-gray-400 mb-6">
                <span className="block w-12 bg-white z-10 text-center font-medium">
                    OR
                </span>
                <span className="absolute w-full border-t border-gray-200 top-3"></span>
            </div>

            <OAuth />

            <p className="text-sm text-center font-medium">
                Joined us before?{" "}
                <Link to="/sign-in" className="text-sky-600 inline-block ml-1">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignUp;
