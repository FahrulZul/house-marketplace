import { Link } from "react-router-dom";
import { FiSearch, FiTrash, FiEdit } from "react-icons/fi";

function ListingsItem({ id, data, onDelete, onEdit }) {
    return (
        <div className="block mb-4 bg-white rounded-lg shadow">
            <div className="relative w-full h-40 rounded-lg bg-zinc-100 overflow-hidden">
                <img
                    className="w-full h-full object-center object-cover"
                    src={data.imageUrls[0]}
                    alt={data.name}
                />
                <p className="absolute shadow bottom-3 right-3 px-3 py-1 bg-white text-zinc-800 font-medium rounded-2xl">{`${
                    data.imageUrls.length
                } ${data.imageUrls.length > 1 ? "photos" : "photo"}`}</p>

                <div className="absolute top-3 right-3 flex">
                    {onDelete && (
                        <div
                            className="cursor-pointer bg-white rounded-full shadow text-red-600 p-1 mr-1"
                            style={{ background: "rgba(255, 255, 255, 0.8" }}
                            onClick={() => onDelete(id, data.name)}
                        >
                            <FiTrash size={25} />
                        </div>
                    )}
                    {onEdit && (
                        <div
                            className="cursor-pointer bg-white rounded-full shadow text-blue-600 p-1 mr-1"
                            style={{ background: "rgba(255, 255, 255, 0.8" }}
                            onClick={() => onEdit(id)}
                        >
                            <FiEdit size={25} />
                        </div>
                    )}
                    <Link
                        className="inline-block bg-white rounded-full shadow text-zinc-800 p-1"
                        style={{ background: "rgba(255, 255, 255, 0.8" }}
                        to={`/category/${data.type}/${id}`}
                    >
                        <FiSearch size={25} />
                    </Link>
                </div>
            </div>
            <div className="flex-1 px-4 py-3">
                <p className="text-base font-medium mb-1">{data.name}</p>
                <p className="text-2xl font-bold mb-1">
                    RM
                    {data.offer
                        ? data.discountedPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : data.regularPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {data.type === "rent" && (
                        <span className="text-base text-zinc-400 font-normal">
                            /month
                        </span>
                    )}
                </p>
                <p>
                    <span className="inline-block mr-2">{`${
                        data.bedrooms > 1 ? `${data.bedrooms} beds` : "1 bed"
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
    );
}

export default ListingsItem;
