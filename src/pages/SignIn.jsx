import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { FiAtSign, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import OAuth from "../components/OAuth";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

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
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredential.user) {
                navigate("/");
            }
        } catch (error) {
            toast.error("Bad user credential");
        }
    };

    return (
        <div className="bg-white rounded-2xl ">
            <h1 className="text-gray-900 text-3xl font-bold mb-10">Login</h1>

            <form className="mb-6" onSubmit={onSubmit}>
                <div className="flex items-start mb-5">
                    <FiAtSign size={20} className="text-gray-400 mr-4" />
                    <div className="flex flex-1 items-center border-b border-gray-200 pb-2">
                        <input
                            className="w-full text-sm bg-white focus:outline-none"
                            type="email"
                            id="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email ID"
                        />
                    </div>
                </div>

                <div className="flex items-start mb-6">
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

                <Link
                    to="/forgot-password"
                    className="inline-block w-full text-sm text-right text-indigo-600 font-medium mb-6"
                >
                    Forgot Password?
                </Link>

                <button
                    type="submit"
                    className="bg-indigo-600 w-full text-sm font-semibold text-white py-3 rounded-xl"
                >
                    Login
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
                New User?{" "}
                <Link
                    to="/sign-up"
                    className="text-indigo-600 inline-block ml-1"
                >
                    Register
                </Link>
            </p>
        </div>
    );
}

export default SignIn;
