import { FiAtSign, FiLock, FiEyeOff } from "react-icons/fi";

function SignIn() {
    return (
        <div className="bg-white rounded-2xl ">
            <h1 className="text-neutral-900 text-2xl font-bold mb-10">Login</h1>

            <form className="mb-4">
                <div className="flex items-start mb-5">
                    <FiAtSign size={20} className="text-neutral-400 mr-4" />
                    <div className="flex flex-1 items-center border-b border-neutral-200 pb-2">
                        <input
                            className="text-sm focus:outline-none"
                            type="text"
                            placeholder="Email ID"
                        />
                    </div>
                </div>

                <div className="flex items-start">
                    <FiLock size={20} className="text-neutral-400 mr-4" />
                    <div className="flex flex-1 items-center border-b border-neutral-200 pb-2">
                        <input
                            className="flex-1 text-sm focus:outline-none"
                            type="text"
                            placeholder="Password"
                        />
                        <FiEyeOff className="text-neutral-400" />
                    </div>
                </div>
            </form>

            <p className="text-sm text-right text-sky-600 font-medium mb-6">
                Forgot Password?
            </p>

            <button className="bg-blue-600 w-full text-sm font-semibold text-white py-3 rounded-xl mb-6">
                Login
            </button>

            <div className="relative w-full flex justify-center text-neutral-400">
                <span className="block w-12 bg-white z-10 text-center font-medium">
                    OR
                </span>
                <span className="absolute w-full border-t border-neutral-200 top-3"></span>
            </div>
        </div>
    );
}

export default SignIn;
