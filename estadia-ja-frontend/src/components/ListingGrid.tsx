import React from "react";
import { ListingCard, type Listing } from "./ListingCard";

type ListingGridProps = {
    listings: Listing[];
};

export function ListingGrid ({ listings }: ListingGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}

        </div>
    );
}