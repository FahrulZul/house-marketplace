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
import { FiMapPin, FiChevronLeft, FiShare2 } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";
import { TbParking, TbArmchair } from "react-icons/tb";
import Spinner from "../components/Spinner";

function Listing() {
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
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
        <div className="text-sm">
            <div className="flex items-center justify-between mb-6">
                <div onClick={() => navigate(-1)}>
                    <FiChevronLeft size={25} className="text-zinc-600" />
                </div>

                <p className="inline-block text-base font-bold bg-white shadow px-2 py-1 rounded">
                    RM
                    {listing.offer
                        ? listing.discountedPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : listing.regularPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {listing.type === "rent" && (
                        <span className="text-base text-zinc-400 font-normal">
                            /month
                        </span>
                    )}
                </p>

                <div
                    className="relative"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
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

            <div className="w-full h-52 bg-zinc-200 rounded-lg mb-4 overflow-hidden">
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
                                className="w-full h-full object-cover"
                                src={url}
                                alt="Houses"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-medium mb-2">{listing.name}</h2>
                <div className="mb-6 text-xs">
                    <p className="bg-emerald-500 text-zinc-50 font-medium w-fit inline-block px-2 py-1 rounded-lg shadow mr-3">
                        For {listing.type === "rent" ? "rent" : "sale"}
                    </p>
                    {listing.offer && (
                        <p className="bg-orange-500 text-zinc-50 font-medium w-fit inline-block px-2 py-1 rounded-lg shadow">
                            {`RM ${(
                                listing.regularPrice - listing.discountedPrice
                            )
                                .toString()
                                .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )} discount`}
                        </p>
                    )}
                </div>
                <div className="flex items-start text-zinc-400">
                    <FiMapPin size={30} className="mr-3 " />
                    <p className="font-light mt-1">{listing.location}</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-10">
                <div className="flex flex-col items-center">
                    <div className="text-indigo-500 bg-zinc-100 p-3 rounded-full shadow mb-2">
                        <BiBed size={22} />
                    </div>
                    <span className="inline-block text-zinc-500 text-center">{`${
                        listing.bedrooms > 1
                            ? `${listing.bedrooms} beds`
                            : "1 bed"
                    }`}</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-indigo-500 bg-zinc-100 p-3 rounded-full shadow mb-2">
                        <BiBath size={22} />
                    </div>
                    <span className="inline-block text-zinc-500 text-center">{`${
                        listing.bathrooms > 1
                            ? `${listing.bathrooms} baths`
                            : "1 bath"
                    }`}</span>
                </div>

                {listing.furnished && (
                    <div className="flex flex-col items-center">
                        <div className="text-indigo-500 bg-zinc-100 p-3 rounded-full shadow mb-2">
                            <TbArmchair size={22} />
                        </div>

                        <span className="inline-block text-zinc-500 text-center">
                            Furnished
                        </span>
                    </div>
                )}

                {listing.parking && (
                    <div className="flex flex-col items-center">
                        <div className="text-indigo-500 bg-zinc-100 p-3 rounded-full shadow mb-2">
                            <TbParking size={22} />
                        </div>
                        <span className="inline-block text-zinc-500 text-center">
                            Parking Spot
                        </span>
                    </div>
                )}
            </div>

            <div className="h-52 w-full mb-10 rounded-lg overflow-hidden z-0 relative">
                <MapContainer
                    style={{ height: "100%", width: "100%" }}
                    center={[listing.geolocation.lat, listing.geolocation.lng]}
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

            {auth.currentUser?.uid !== listing.userRef && (
                <Link
                    to={`/contact/${listing.userRef}?listingName=${listing.name}&listingPage=${location.pathname}`}
                    className="text-zinc-50 bg-indigo-600 w-full py-2 text-center font-semibold rounded-lg inline-block"
                >
                    Contact Landlord
                </Link>
            )}
        </div>
    );
}

export default Listing;

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
