import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import Spinner from "../Spinner";
import { formatPrice } from "../../utils/utils";

function Slider() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListing = async () => {
            const listingRef = collection(db, "listings");
            const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            setListings(listings);
            setLoading(false);
        };

        fetchListing();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (listings.length === 0) {
        return <></>;
    }

    return (
        <div className="w-full h-52 sm:h-96 bg-zinc-200 mb-4 sm:mb-8 rounded-xl overflow-hidden">
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                speed={800}
                slidesPerView={1}
                loop
                className="w-full h-full"
            >
                {listings.map(({ data, id }) => (
                    <SwiperSlide
                        key={id}
                        onClick={() => navigate(`/category/${data.type}/${id}`)}
                    >
                        <div className="relative w-full h-full cursor-pointer">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={data.imageUrls[0]}
                                alt="Houses"
                            />
                            <div
                                className=" absolute px-4 py-2 rounded-lg bottom-8 left-4"
                                style={{ background: "rgba(0,0,0,0.5)" }}
                            >
                                <span className="text-xs text-white">
                                    {data.type === "rent"
                                        ? "For rent"
                                        : "For Sale"}
                                </span>
                                <p className=" text-gray-50 text-xl sm:text-2xl font-bold mb-2">
                                    {data.name}
                                </p>
                                {data.offer && (
                                    <p className="text-gray-400 text-sm line-through">
                                        RM {formatPrice(data.regularPrice)}
                                        {data.type === "rent" && (
                                            <span>/month</span>
                                        )}
                                    </p>
                                )}
                                <p className=" text-gray-50 text-base font-semibold">
                                    <span className="mr-1">RM</span>
                                    {data.offer
                                        ? formatPrice(data.discountedPrice)
                                        : formatPrice(data.regularPrice)}
                                    {data.type === "rent" && (
                                        <span className="text-base text-zinc-50 font-normal">
                                            /month
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slider;
