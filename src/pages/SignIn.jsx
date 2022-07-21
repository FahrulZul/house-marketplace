import { FiAtSign, FiLock, FiEyeOff } from "react-icons/fi";

function SignIn() {
    return (
        <div className="bg-white rounded-2xl ">
            <h1 className="text-neutral-600 text-3xl font-bold mb-10">Login</h1>
            <form className="mb-4">
                <div className="flex items-center mb-5">
                    <FiAtSign size={20} className="text-neutral-400 mr-4" />
                    <div className="flex-1 border-b border-neutral-200">
                        <input
                            className="text-sm pb-1 focus:outline-none"
                            type="text"
                            placeholder="Email ID"
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <FiLock size={20} className="text-neutral-400 mr-4" />
                    <div className="flex border-b border-neutral-200">
                        <input
                            className="flex-1 text-sm pb-1 focus:outline-none"
                            type="text"
                            placeholder="Password"
                        />
                        <FiEyeOff />
                    </div>
                </div>
            </form>
            <p className="text-sm text-right text-indigo-600 font-bold mb-6">
                Forgot Password?
            </p>
            <button className="bg-indigo-600 w-full text-base font-bold text-white py-4 rounded-xl">
                Login
            </button>
        </div>
    );
}

export default SignIn;
