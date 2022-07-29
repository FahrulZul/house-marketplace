import { Link } from "react-router-dom";

function ListingsItem({ id, data }) {
    return (
        <Link className="block mb-4" to={`/category/${data.type}/${id}`}>
            <div className="relative w-full h-40 rounded-lg bg-zinc-100 overflow-hidden">
                <img
                    className="w-full h-full object-center object-cover"
                    src={data.imageUrls[0]}
                    alt={data.name}
                />
                <p className="absolute bottom-2 right-2 px-3 py-1 bg-white text-zinc-800 font-medium rounded-2xl">{`${
                    data.imageUrls.length
                } ${data.imageUrls.length > 1 ? "photos" : "photo"}`}</p>
            </div>
            <div className="flex-1 py-4">
                <p className="text-base font-medium mb-2">{data.name}</p>
                <p className="text-2xl font-bold mb-2">
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
                <p className="mb-1">
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
        </Link>
    );
}

export default ListingsItem;
