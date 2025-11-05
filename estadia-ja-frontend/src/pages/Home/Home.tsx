import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Banner } from "../../components/Banner";
import { SearchBar } from "../../components/SearchBar";
import { DestinationModal } from "../../components/modals/DestinationModal";
import { CalendarModal } from "../../components/modals/CalendarModal";
import { GuestsModal } from "../../components/modals/GuestModal";

export function Home () {

    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("1");

    const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Buscando dados na HomePage com:", {
            destination,
            checkIn,
            checkOut,
            guests,
        });
    };

    const openDestinationModal = () => setIsDestinationModalOpen(true);
    const openCalendarModal = () => setIsCalendarModalOpen(true);
    const openGuestsModal = () => setIsGuestsModalOpen(true);

    return (
        <>
            <Header/>
            <Banner/>
            <SearchBar
                destination={destination}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                onSearchSubmit={handleSearchSubmit}
                onOpenDestinationModal={openDestinationModal}
                onOpenCalendarModal={openCalendarModal}
                onOpenGuestsModal={openGuestsModal}
            />
            <Footer/>
            {isDestinationModalOpen && (
                <DestinationModal
                    onClose={() => setIsDestinationModalOpen(false)}
                    onSelect={(value) => {
                        setDestination(value); 
                        setIsDestinationModalOpen(false); 
                    }}
                />
            )}

            {isCalendarModalOpen && (
                <CalendarModal
                    onClose={() => setIsCalendarModalOpen(false)}
                    onApply={(inDate, outDate) => {
                        setCheckIn(inDate);
                        setCheckOut(outDate);
                        setIsCalendarModalOpen(false);
                    }}
                />
            )}

            {isGuestsModalOpen && (
                <GuestsModal
                    currentGuests={guests}
                    onClose={() => setIsGuestsModalOpen(false)}
                    onApply={(value) => {
                        setGuests(value);
                        setIsGuestsModalOpen(false);
                    }}
                />
            )}
        </>
    );
}