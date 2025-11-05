import React, { useState } from "react";
import { X, UsersRound, Plus, Minus } from "lucide-react";

type GuestsModalProps = {
    currentGuests: string; 
    onClose: () => void;
    onApply: (guests: string) => void;
};

export function GuestsModal(props: GuestsModalProps) {
    const [count, setCount] = useState(parseInt(props.currentGuests) || 1);

    const increment = () => {
        setCount((prev) => prev + 1);
    };

    const decrement = () => {
        setCount((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleApply = () => {
        props.onApply(count.toString()); 
        props.onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1D3557]">
                        Quantos hóspedes?
                    </h2>
                    <button
                        onClick={props.onClose}
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <UsersRound className="w-6 h-6 text-[#1D3557]" />
                        <span className="text-lg text-gray-700">Hóspedes</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button
                            onClick={decrement}
                            disabled={count <= 1}
                            className="w-10 h-10 rounded-full border-2 border-[#1D3557] text-[#1D3557] flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                        >
                            <Minus className="w-5 h-5" />
                        </button>
                        
                        <span className="text-xl font-bold w-10 text-center">{count}</span>
                        
                        <button
                            onClick={increment}
                            className="w-10 h-10 rounded-full border-2 border-[#1D3557] text-[#1D3557] flex items-center justify-center hover:bg-gray-100"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleApply}
                    className="w-full py-3 rounded-full bg-[#1D3557] text-white font-semibold text-lg hover:bg-opacity-90 transition-colors"
                >
                    Aplicar
                </button>
            </div>
        </div>
    );
}