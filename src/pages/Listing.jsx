import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import BackButton from "../components/uiComponents/BackButton";
import { discountPrice, formatPrice } from "../utils/utils";
import ListingPerks from "../components/listing/ListingPerks";
import ShareButton from "../components/uiComponents/ShareButton";

function Listing() {
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState(null);

    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, "listings", param.listingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false);
            } else {
                navigate("/explore");
            }
        };

        fetchListing();
    }, [navigate, param.listingId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="text-sm relative">
            <div className="mb-6">
                <BackButton />
            </div>

            {/* Swiper */}
            <div className="w-full h-60 sm:h-96 bg-zinc-200 rounded-lg mb-4 overflow-hidden">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    speed={800}
                    slidesPerView={1}
                    loop
                    className="w-full h-full"
                >
                    {listing.imageUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <img
                                className="w-full h-full object-cover object-center"
                                src={url}
                                alt="Houses"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Title */}
            <div className="my-10">
                <div className="flex justify-between sm:items-center mb-6 flex-col sm:flex-row">
                    <div>
                        <div className="flex items-center mb-3">
                            <h2 className="text-2xl font-semibold sm:text-4xl mr-4">
                                {listing.name}
                            </h2>
                            <ShareButton />
                        </div>
                        <p className="inline-block text-lg font-bold bg-white shadow px-2 py-1 rounded">
                            RM
                            {listing.offer
                                ? formatPrice(listing.discountedPrice)
                                : formatPrice(listing.regularPrice)}
                            {listing.type === "rent" && (
                                <span className="text-sm text-zinc-400 font-normal">
                                    /month
                                </span>
                            )}
                        </p>
                    </div>
                    {auth.currentUser?.uid !== listing.userRef && (
                        <Link
                            to={`/contact/${listing.userRef}?listingName=${listing.name}&listingPage=${location.pathname}`}
                            className="text-zinc-50 bg-indigo-600 py-3 px-4 font-semibold rounded-lg inline-block fixed sm:relative sm:bottom-0 bottom-20 z-20 left-6 right-6 sm:left-0 sm:right-0 text-center"
                        >
                            Contact Landlord
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row-reverse sm:items-center mb-10">
                <div className="sm:flex-1 sm:ml-10">
                    <div className="mb-6">
                        <p className="bg-emerald-500 text-zinc-50 font-medium w-fit inline-block px-2 py-1 rounded-lg shadow mr-3">
                            For {listing.type === "rent" ? "rent" : "sale"}
                        </p>
                        {listing.offer && (
                            <p className="bg-orange-500 text-zinc-50 font-medium w-fit inline-block px-2 py-1 rounded-lg shadow">
                                {`RM ${discountPrice(
                                    listing.regularPrice,
                                    listing.discountedPrice
                                )} discount`}
                            </p>
                        )}
                    </div>
                    <ListingPerks listing={listing} />
                </div>

                <div className="sm:flex-1 h-56 sm:h-96 w-full rounded-lg overflow-hidden relative">
                    <div className="absolute z-10 bg-white/[0.8] w-32 sm:w-48 top-4 right-4 py-1 px-2 sm:py-3 sm:px-4 rounded-lg text-xs sm:text-base text-zinc-600 shadow-xl">
                        {/* <FiMapPin size={30} className="mr-3 " /> */}
                        <p className="font-base mt-1">{listing.location}</p>
                    </div>
                    <MapContainer
                        className="w-full h-full z-0"
                        center={[
                            listing.geolocation.lat,
                            listing.geolocation.lng,
                        ]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                        />

                        <Marker
                            style={{ color: "red" }}
                            position={[
                                listing.geolocation.lat,
                                listing.geolocation.lng,
                            ]}
                        >
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Listing;

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
