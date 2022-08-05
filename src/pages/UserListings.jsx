import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useAuthStatus } from "../hooks/useAuthStatus";
import ListingsItem from "../components/ListingsItem";

function UserListings() {
    const [listings, setListings] = useState(null);
    const { loggedIn, checkingStatus } = useAuthStatus();

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            const fetchListings = async (authObj) => {
                const listingsRef = collection(db, "listings");

                const q = query(
                    listingsRef,
                    where("userRef", "==", auth.currentUser.uid),
                    orderBy("timestamp", "desc")
                );
                const querySnap = await getDocs(q);

                let listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });

                setListings(listings);
            };

            fetchListings();
        }
    }, [auth.currentUser, loggedIn, checkingStatus]);

    const onDelete = async (listingId) => {
        if (window.confirm("Are you sure want to delete?")) {
            await deleteDoc(doc(db, "listings", listingId));
            const updatedListings = listings.filter(
                (listing) => listing.id !== listingId
            );
            setListings(updatedListings);
            toast.success("Successfully deleted listing");
        }
    };

    const onEdit = (listingId) => {
        navigate(`/edit-listing/${listingId}`);
    };

    if (checkingStatus) {
        return <Spinner />;
    }

    return (
        <div className="text-sm">
            <div className="relative mb-10">
                <Link to="/profile" className="absolute">
                    <FiChevronLeft size={25} className="text-zinc-600" />
                </Link>
                <h1 className="text-base font-semibold text-center">
                    Your Listings
                </h1>
            </div>

            {listings?.length > 0 && (
                <>
                    {listings.map((listing) => (
                        <ListingsItem
                            key={listing.id}
                            data={listing.data}
                            id={listing.id}
                            onDelete={() => onDelete(listing.id)}
                            onEdit={() => onEdit(listing.id)}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default UserListings;
