import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function OAuth() {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check for user
            const docRef = doc(db, "users", user.uid);
            const docSnap = getDoc(docRef);

            // If user doesn't exist, create user
            if (!(await docSnap).exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (error) {
            toast.error("Could not authorize with google");
        }
    };

    return (
        <div>
            <button
                className="relative py-3 w-full bg-gray-100 text-gray-500 text-sm font-semibold rounded-xl mb-12"
                onClick={onGoogleClick}
            >
                <GoogleIcon className="absolute w-6 top-2.5 left-8" />
                {location.pathname === "/sign-in" ? "Login" : "Sign up"} with
                Google
            </button>
        </div>
    );
}

export default OAuth;
