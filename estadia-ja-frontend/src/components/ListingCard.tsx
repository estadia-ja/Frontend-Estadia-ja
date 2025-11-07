import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type PropertyImage = {
  id: string;
  url?: string;
};

export type Property = {
  id: string;
  type: string;
  description: string;
  city: string;
  state: string;
  dailyRate: number;
  avgRating: number | null;
  images: PropertyImage[];
  user?: {
    id: string;
    name: string;
  };
};

type ListingCardProps = {
  property: Property;
};

export function ListingCard({ property }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const title = `${property.type} em ${property.city}`;
  const formattedPrice = `R$ ${property.dailyRate.toFixed(2).replace(".", ",")}`;

  const firstImageId = property.images?.[0]?.id;
  
  const imageUrl = firstImageId
    ? `${API_URL}/property/image/${firstImageId}`
    : `https://placehold.co/600x400/457B9D/FFFFFF?text=${property.type}`;

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="block w-full rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
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
        <h3 className="text-lg font-bold text-[#1D3557] truncate" title={title}>
          {title}
        </h3>
        
        <p className="text-sm text-gray-700 mt-1">
          {formattedPrice} / noite
        </p>

        <div className="flex items-center mt-2">
          {property.avgRating ? (
            <>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {property.avgRating.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500">Novo</span>
          )}
        </div>
      </div>
    </Link>
  );
}