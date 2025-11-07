import React from "react";
import { ListingCard, type Property } from "./ListingCard";

type ListingGridProps = {
  listings: Property[];
};

export function ListingGrid({ listings }: ListingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {listings.map((property) => (
        
        <ListingCard key={property.id} property={property} />
      
      ))}
    </div>
  );
}