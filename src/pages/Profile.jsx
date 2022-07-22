import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
    const auth = getAuth();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const navigate = useNavigate();

    const onLogOut = () => {
        auth.signOut();
        navigate("/");
    };

    return (
        <div>
            <h1 className="text-gray-900 text-2xl font-bold mb-10">Welcome!</h1>
            <button
                className="text-sm font-semibold text-red-500"
                onClick={onLogOut}
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
