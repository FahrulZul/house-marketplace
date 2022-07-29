import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { FiMapPin, FiChevronLeft, FiShare2 } from "react-icons/fi";
import Spinner from "../components/Spinner";

function Listing() {
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [listing, setListing] = useState(null);

    const auth = getAuth();
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, "listings", param.listingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false);
            }
        };

        fetchListing();
    }, [param.listingId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="text-sm">
            <div className="flex items-center justify-between mb-6">
                <Link
                    to={
                        listing.offer
                            ? "/offers"
                            : listing.type === "rent"
                            ? "/category/rent"
                            : "/category/sale"
                    }
                >
                    <FiChevronLeft size={25} className="text-zinc-600" />
                </Link>

                <div
                    className="relative"
                    onClick={() => {
                        // navigator.clipboard.writeText(window.location.href);
                        setShareLinkCopied(true);
                        setTimeout(() => {
                            setShareLinkCopied(false);
                        }, 2000);
                    }}
                >
                    <FiShare2 size={20} />
                    {shareLinkCopied && (
                        <p className="absolute right-full w-20 top-1 text-xs">
                            Link Copied!
                        </p>
                    )}
                </div>
            </div>

            <div className="w-full h-52 bg-zinc-200 rounded-lg mb-4"></div>

            <div>
                <div className="flex items-center mb-3">
                    <FiMapPin size={25} className="mr-3 text-indigo-600" />
                    <p className="text-zinc-400 font-light">
                        {listing.location}
                    </p>
                </div>
                <div>
                    <h2 className="text-base">{listing.name}</h2>
                </div>
            </div>
        </div>
    );
}

export default Listing;
