import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingsItem from "../components/listing/ListingsItem";

function Offers() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get Reference
                const listingsRef = collection(db, "listings");

                // Create Query
                const q = query(
                    listingsRef,
                    where("offer", "==", true),
                    orderBy("timestamp", "desc", limit(10))
                );

                // Execute Query
                const querySnap = await getDocs(q);

                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });

                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error("Could not fetch listings");
            }
        };

        fetchListings();
    }, []);

    return (
        <div className="text-sm">
            <h1 className="text-base font-semibold text-center py-2 mb-10">
                Offers
            </h1>

            {loading ? (
                <Spinner />
            ) : listings.length > 0 ? (
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-nowrap">
                    {listings.map((listing) => (
                        <ListingsItem
                            key={listing.id}
                            id={listing.id}
                            data={listing.data}
                        />
                    ))}
                </div>
            ) : (
                <h2>No offer has been listed.</h2>
            )}
        </div>
    );
}

export default Offers;
