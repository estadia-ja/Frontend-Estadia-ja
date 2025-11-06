import React, { useState, useMemo } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Banner } from "../../components/Banner";
import { SearchBar } from "../../components/SearchBar";
import { DestinationModal } from "../../components/modals/DestinationModal";
import { CalendarModal } from "../../components/modals/CalendarModal";
import { GuestsModal } from "../../components/modals/GuestModal";
import { ListingGrid } from "../../components/ListingGrid";
import { type Listing } from "../../components/ListingCard";
import { FilterBar } from "../../components/FilterBar";

const MOCK_DATA: Listing[] = [
    { id: "1", title: "Apartamento Aconchegante em São Paulo", imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1974", pricePerNight: 250, rating: 4.8 },
    { id: "2", title: "Casa de Praia em Ubatuba", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070", pricePerNight: 450, rating: 4.9 },
    { id: "3", title: "Chalé nas Montanhas (Campos do Jordão)", imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974", pricePerNight: 380, rating: 4.7 },
    { id: "4", title: "Loft Moderno no Centro (Curitiba)", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070", pricePerNight: 190, rating: 4.6 },
    { id: "5", title: "Pousada com Vista para o Mar (Salvador)", imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949", pricePerNight: 320, rating: 4.8 },
    { id: "6", title: "Fazenda Histórica (Minas Gerais)", imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070", pricePerNight: 500, rating: 4.9 },
    { id: "7", title: "Apartamento na Orla (Rio de Janeiro)", imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070", pricePerNight: 600, rating: 4.7 },
    { id: "8", title: "Cabana na Floresta (Amazônia)", imageUrl: "https://images.unsplash.com/photo-1542361252-81b21952d7d8?q=80&w=2070", pricePerNight: 420, rating: 4.9 },
];

const locationOptions = [
    ...new Set(MOCK_DATA.map(item => {
      const parts = item.title.split(" em ");
      return parts.length > 1 ? parts[1] : item.title.split(" (")[0];
    }))
];

export function Home () {
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("1");

    const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);

    const [allListings] = useState(MOCK_DATA);
    const [filterLocation, setFilterLocation] = useState("all");
    const [filterRating, setFilterRating] = useState("all");

    const listings = useMemo(() => {
        // A lógica de filtragem vai aqui dentro
        let filtered = [...allListings];
    
        if (destination) {
            filtered = filtered.filter(l =>
                l.title.toLowerCase().includes(destination.toLowerCase())
            );
        }
        
        if (filterLocation !== "all") {
            filtered = filtered.filter(l => 
                l.title.includes(filterLocation)
            );
        }
    
        if (filterRating !== "all") {
            const minRating = parseFloat(filterRating);
            filtered = filtered.filter(l => l.rating >= minRating);
        }
        
        return filtered; 
    
    }, [allListings, destination, filterLocation, filterRating]);
    
    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Busca disparada!");
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
            <main className="container mx-auto p-4 md:p-8">
                <h2 className="text-3xl font-bold text-[#1D3557] mb-6">
                    {destination ? `Resultados para "${destination}"` : "Lugares mais visitados"}
                </h2>

                <FilterBar
                    filterLocation={filterLocation}
                    setFilterLocation={setFilterLocation}
                    filterRating={filterRating}
                    setFilterRating={setFilterRating}
                    locationOptions={locationOptions}
                />

                {listings.length > 0 ? (
                <ListingGrid listings={listings} />
                ) : (
                <p className="text-center text-gray-600">
                    Nenhum resultado encontrado. Tente uma busca diferente.
                </p>
                )}
            </main>

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