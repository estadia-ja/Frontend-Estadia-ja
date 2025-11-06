import React from "react";
import { MapPin, Star } from "lucide-react";

type FilterBarProps = {
    filterLocation: string;
    setFilterLocation: (value: string) => void;
    filterRating: string;
    setFilterRating: (value: string) => void;
    locationOptions: string[];
};

export function FilterBar (props: FilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-6">
          
            <div className="w-full md:w-auto">
                <label htmlFor="filter-location" className="sr-only">Filtre por lugar</label>
                <div className="relative">
                    <MapPin className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                        id="filter-location"
                        value={props.filterLocation}
                        onChange={(e) => props.setFilterLocation(e.target.value)}
                        className="w-full md:w-auto pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white"
                    >
                        <option value="all">Todos os Lugares</option>
                            {props.locationOptions.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
    
            <div className="w-full md:w-auto">
                <label htmlFor="filter-rating" className="sr-only">Filtre por avaliação</label>
                <div className="relative">
                    <Star className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                        id="filter-rating"
                        value={props.filterRating}
                        onChange={(e) => props.setFilterRating(e.target.value)}
                        className="w-full md:w-auto pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white"
                    >
                        <option value="all">Qualquer Avaliação</option>
                        <option value="4.5">4.5+ estrelas</option>
                        <option value="4">4.0+ estrelas</option>
                        <option value="3">3.0+ estrelas</option>
                    </select>
                </div>
            </div>
        </div>
    );
}