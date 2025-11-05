import React, { useState } from "react";
import { X, MapPin, Search } from "lucide-react";

type DestinationModalProps = {
    onClose: () => void; 
    onSelect: (destination: string) => void; 
};

export function DestinationModal(props: DestinationModalProps) {
    const [local, setLocal] = useState("");

    const handleSelect = () => {
        props.onSelect(local);
        props.onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#1D3557]">Para onde?</h2>
                    <button
                        onClick={props.onClose} 
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                <div className="relative mb-4">
                    <MapPin
                        className="w-5 h-5 text-[#1D3557] absolute left-4 top-1/2 -translate-y-1/2"
                        opacity={0.7}
                    />
                    <input
                        id="destination-modal-input"
                        type="text"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                        placeholder="Buscar por localidade"
                        className="w-full pl-12 pr-6 py-3 rounded-full border-2 border-gray-300 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]"
                        autoFocus 
                    />
                </div>
                
                <button
                    onClick={handleSelect}
                    className="w-full py-3 rounded-full bg-[#1D3557] text-white font-semibold text-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                    <Search className="w-5 h-5" />
                    Buscar
                </button>
            </div>
        </div>
    );
}