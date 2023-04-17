import React from "react";
import ListingPerkItem from "./ListingPerkItem";
import { BiBed, BiBath } from "react-icons/bi";
import { TbParking, TbArmchair } from "react-icons/tb";

const ListingPerks = ({ listing }) => {
    return (
        <div className="flex sm:flex-col  gap-4">
            <ListingPerkItem Icon={BiBed}>
                {`${
                    listing.bedrooms > 1
                        ? `${listing.bedrooms} bedrooms`
                        : "1 bedroom"
                }`}
            </ListingPerkItem>
            <ListingPerkItem Icon={BiBath}>
                {`${
                    listing.bedrooms > 1
                        ? `${listing.bathrooms} bathrooms`
                        : "1 bathroom"
                }`}
            </ListingPerkItem>

            {listing.furnished && (
                <ListingPerkItem Icon={TbArmchair}>Furnished</ListingPerkItem>
            )}

            {listing.parking && (
                <ListingPerkItem Icon={TbParking}>Parking Spot</ListingPerkItem>
            )}
        </div>
    );
};

export default ListingPerks;
