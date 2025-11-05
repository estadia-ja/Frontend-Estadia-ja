import React, { useState } from "react";
import { X } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

type CalendarModalProps = {
    onClose: () => void;
    onApply: (checkIn: string, checkOut:string) => void;
};

const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
};

export function CalendarModal (props: CalendarModalProps) {

    const today = new Date ();

    const [range, setRange] = useState<DateRange| undefined>(undefined);

    const handleApply = () => {
        if(range?.from && range?.to) {
            props.onApply(formatDate(range.from), formatDate(range.to));
            props.onClose();
        } else if(range?.from) {
            props.onApply(formatDate(range.from), formatDate(range.from));
            props.onClose();
        }
    }
    return(
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#1D3557]">
                        Selecione as datas
                    </h2>
                    <button
                        onClick={props.onClose}
                        className="p-2 rounded-full hover:bg-gray-200"
                    >
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                <div>
                    <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        disabled={{ before: today }} 
                        numberOfMonths={2} 
                    />
                </div>

                <button
                    onClick={handleApply}
                    disabled={!range?.from} 
                    className="w-full mt-4 py-3 rounded-full bg-[#1D3557] text-white font-semibold text-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                    Aplicar
                </button>
            </div>
        </div>
    );
}
