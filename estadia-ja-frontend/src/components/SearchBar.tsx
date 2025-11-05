import React from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    onSearchSubmit: (event: React.FormEvent) => void;
    onOpenDestinationModal: () => void;
    onOpenCalendarModal: () => void;
    onOpenGuestsModal: () => void;
};

export function SearchBar(props: SearchBarProps) {
    return (
        <form
          onSubmit={props.onSearchSubmit}
          className="container mx-auto p-4 w-full max-w-4xl"
        >
            <div className="w-full flex flex-col md:flex-row md:h-[72px] rounded-xl md:rounded-full shadow-lg overflow-hidden">
                
                <button
                    type="button"
                    onClick={props.onOpenDestinationModal}
                    className="h-16 md:h-full md:flex-1 w-full flex flex-col justify-center text-left pl-6 bg-[#457B9D] text-white hover:bg-opacity-90 transition-colors"
                >
                    <span className="text-xs font-bold uppercase">Onde</span>
                    <span className="text-sm truncate">
                        {props.destination || "Buscar por localidade"}
                    </span>
                </button>
        
                <button
                    type="button"
                    onClick={props.onOpenCalendarModal}
                    className="h-16 md:h-full md:flex-1 w-full flex flex-col justify-center text-left pl-6 bg-[#1D3557] text-white hover:bg-opacity-80 transition-colors"
                >
                    <span className="text-xs font-bold uppercase">Check-in</span>
                    <span className="text-sm">
                        {props.checkIn || "Insira data de chegada"}
                    </span>
                </button>
        
                <button
                    type="button"
                    onClick={props.onOpenCalendarModal}
                    className="h-16 md:h-full md:flex-1 w-full flex flex-col justify-center text-left pl-6 bg-[#457B9D] text-white hover:bg-opacity-90 transition-colors"
                >
                    <span className="text-sm">
                        {props.checkOut || "Insira data de saída"}
                    </span>
                </button>
        
                <div className="h-16 md:h-full md:flex-1 w-full flex items-center justify-between pl-6 bg-[#1D3557] text-white">
                
                <button
                    type="button"
                    onClick={props.onOpenGuestsModal}
                    className="flex-1 h-full flex flex-col justify-center text-left"
                >
                    <span className="text-xs font-bold uppercase">Quem</span>
                    <span className="text-sm">
                        {props.guests} {parseInt(props.guests) > 1 ? "hóspedes" : "hóspede"}
                    </span>
                </button>
                
                <div className="h-10 w-px bg-white opacity-30 mx-2" />
        
                    <button
                        type="submit"
                        className="h-14 w-14 mr-2 flex-shrink-0 flex items-center justify-center bg-[#457B9D] rounded-full hover:bg-opacity-90 transition-colors"
                        aria-label="Buscar"
                    >
                        <Search className="w-6 h-6 text-white" />
                    </button>
                </div>
                
            </div>
        </form>
    );
}