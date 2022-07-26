import { FiMapPin } from "react-icons/fi";

function ListingsItem({ id, data }) {
    return (
        <div className="flex shadow rounded-lg">
            <div className="w-32 h-32 bg-zinc-100 rounded-lg overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={data.imageUrls[0]}
                    alt="House for sale/rent"
                />
            </div>
            <div className="flex-1 p-4">
                <div className="flex items-center mb-2">
                    <FiMapPin className="text-pink-300 mr-2" />
                    <p className="flex-1 text-xs">{data.location}S</p>
                </div>
                <p className="font-bold">{data.name}</p>
                <p>RM 2000</p>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default ListingsItem;
