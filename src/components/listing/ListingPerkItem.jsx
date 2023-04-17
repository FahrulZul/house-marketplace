const ListingPerkItem = ({ Icon, children }) => {
    return (
        <div className="w-24 flex-col sm:w-full flex sm:flex-row items-center mb-6 sm:mb-0">
            <div className="text-indigo-500 bg-zinc-100 p-3 rounded-full shadow mb-2 sm:mr-6 ">
                <Icon size={22} />
            </div>
            <span className="inline-block text-zinc-500 text-center">
                {children}
            </span>
        </div>
    );
};

export default ListingPerkItem;
