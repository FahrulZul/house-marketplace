import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { FiAtSign } from "react-icons/fi";
import { toast } from "react-toastify";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const onChange = (e) => {
        setEmail(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Email was sent");
        } catch (error) {
            toast.error("Could not send reset email.");
        }
    };

    return (
        <div className="bg-white rounded-2xl text-sm">
            <h1 className="text-gray-900 text-3xl font-bold mb-3">
                Forgot
                <br />
                Password?
            </h1>
            <p className="mb-10">
                Don't worry it happen. Please enter the address associated with
                your account.
            </p>

            <form className="mb-8" onSubmit={onSubmit}>
                <div className="flex items-start mb-8">
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

                <button
                    type="submit"
                    className="bg-blue-600 w-full text-sm font-semibold text-white py-3 rounded-xl"
                >
                    Submit
                </button>
            </form>

            <Link to="/sign-in" className="text-sky-600 block text-center">
                Login again?
            </Link>
        </div>
    );
}

export default ForgotPassword;
