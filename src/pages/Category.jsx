import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { FiChevronLeft } from "react-icons/fi";
import ListingsItem from "../components/ListingsItem";

function Category() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get Reference
                const listingsRef = collection(db, "listings");

                // Create Query
                const q = query(
                    listingsRef,
                    where("type", "==", params.categoryName),
                    orderBy("timestamp", "desc"),
                    limit(10)
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
    }, [params.categoryName]);

    return (
        <div className="text-sm">
            <div className="relative mb-10">
                <Link to="/" className="absolute">
                    <FiChevronLeft size={25} className="text-zinc-600" />
                </Link>
                <h1 className="text-base font-semibold text-center">
                    Place for {params.categoryName === "sale" ? "sale" : "rent"}
                </h1>
            </div>

            {loading ? (
                <Spinner />
            ) : listings.length > 0 ? (
                <div>
                    {listings.map((listing) => (
                        <ListingsItem
                            key={listing.id}
                            id={listing.id}
                            data={listing.data}
                        />
                    ))}
                </div>
            ) : (
                <h2>
                    No listings for{" "}
                    {params.categoryName === "sale" ? "sale" : "rent"}.
                </h2>
            )}
        </div>
    );
}

export default Category;
