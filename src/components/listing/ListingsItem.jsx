import { FiTrash, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/utils";

function ListingsItem({ id, data, onDelete, onEdit }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/category/${data.type}/${id}`);
    };

    return (
        <div>
            <div
                className="block bg-white rounded-lg w-full sm:max-w-xs sm:cursor-pointer mb-2 shadow hover:shadow-md transition-shadow ease-in-out duration-300"
                onClick={handleClick}
            >
                <div className="relative w-full h-48 rounded-lg bg-zinc-100 overflow-hidden">
                    <img
                        className="w-full h-full object-center object-cover"
                        src={data.imageUrls[0]}
                        alt={data.name}
                    />
                    {data.offer && (
                        <p className="absolute shadow top-3 left-3 px-3 py-1 bg-rose-400 text-white font-medium rounded-2xl">
                            On Sale
                        </p>
                    )}
                    <p className="absolute shadow bottom-3 right-3 px-3 py-1 bg-white text-zinc-800 font-medium rounded-2xl">{`${
                        data.imageUrls.length
                    } ${data.imageUrls.length > 1 ? "photos" : "photo"}`}</p>
                </div>
                <div className="flex-1 px-4 py-3">
                    <p className="text-base font-medium mb-2">{data.name}</p>
                    <p className="text-2xl font-bold mb-2">
                        RM
                        {data.offer
                            ? formatPrice(data.discountedPrice)
                            : formatPrice(data.regularPrice)}
                        {data.type === "rent" && (
                            <span className="text-base text-zinc-400 font-normal">
                                /month
                            </span>
                        )}
                    </p>
                    <p>
                        <span className="inline-block mr-2">{`${
                            data.bedrooms > 1
                                ? `${data.bedrooms} beds`
                                : "1 bed"
                        }`}</span>{" "}
                        •
                        <span className="inline-block ml-2">{`${
                            data.bathrooms > 1
                                ? `${data.bathrooms} baths`
                                : "1 bath"
                        }`}</span>
                    </p>
                </div>
            </div>
            <div className="flex justify-center gap-2">
                {onEdit && (
                    <div
                        className="cursor-pointer bg-white rounded-full shadow text-blue-600 p-1 mr-1"
                        style={{ background: "rgba(255, 255, 255, 0.8" }}
                        onClick={() => onEdit(id)}
                    >
                        <FiEdit size={25} />
                    </div>
                )}
                {onDelete && (
                    <div
                        className="cursor-pointer bg-white rounded-full shadow text-red-600 p-1 mr-1"
                        style={{ background: "rgba(255, 255, 255, 0.8" }}
                        onClick={() => onDelete(id, data.name)}
                    >
                        <FiTrash size={25} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListingsItem;
