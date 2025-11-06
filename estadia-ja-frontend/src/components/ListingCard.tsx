import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

export type Listing = {
    id: string;
    imageUrl: string;
    title: string;
    pricePerNight: number;
    rating: number;
};

type ListingCardProps = {
    listing: Listing;
};

export function ListingCard({listing}: ListingCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const formattedPrice = `R$ ${listing.pricePerNight.toFixed(2).replace(".", ",")}`;

    const handleFavoriteClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsFavorite(isFavorite);
        //Salvar como favorito
    };

    return (
        <Link
            to={`/property/${listing.id}`}
            className="block w-full rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow"
        >
            <div className="relative">
                <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                />
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white"
                    aria-label="Adicionar aos favoritos"
                >
                <Heart
                    className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-[#1D3557]"}`}
                />
                </button>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-[#1D3557] truncate" title={listing.title}>
                    {listing.title}
                </h3>
                
                <p className="text-sm text-gray-700 mt-1">
                    {formattedPrice} / noite
                </p>

                <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium text-gray-700">
                        {listing.rating.toFixed(1)}
                    </span>
                </div>
            </div>
        </Link>
    );
}