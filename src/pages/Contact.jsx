import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { FiChevronLeft } from "react-icons/fi";

function Contact() {
    const [message, setMessage] = useState("");
    const [landlord, setLandlord] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getLandLord = async () => {
            const docRef = doc(db, "users", param.landlordId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setLandlord(docSnap.data());
            } else {
                toast.error("Could not get landlord data");
            }
        };

        getLandLord();
    }, [param.landlordId]);

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="text-sm">
            <div className="relative mb-10">
                <div onClick={() => navigate(-1)} className="absolute">
                    <FiChevronLeft size={25} className="text-zinc-600" />
                </div>
                <h1 className="text-base font-semibold text-center">Contact</h1>
            </div>
            {landlord !== null && (
                <div>
                    <p className="mb-3">
                        <span className="font-medium">To:</span> {landlord.name}
                    </p>
                    <form>
                        <label
                            className="font-medium inline-block mb-2"
                            htmlFor="message"
                        >
                            Message:
                        </label>
                        <textarea
                            className="block w-full px-3 py-2 border bg-white rounded-lg focus:outline-indigo-200 mb-4"
                            name="message"
                            id="message"
                            value={message}
                            onChange={onChange}
                            rows="8"
                        ></textarea>

                        <a
                            href={`mailto:${
                                landlord.email
                            }?Subject=${searchParams.get(
                                "listingName"
                            )}&body=${message}`}
                        >
                            <button
                                type="button"
                                className="block text-zinc-50 bg-indigo-600 w-full py-2 text-center font-semibold rounded-lg"
                            >
                                Send Message
                            </button>
                        </a>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Contact;
