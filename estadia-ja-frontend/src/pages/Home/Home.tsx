import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Banner } from '../../components/Banner';
import { SearchBar } from '../../components/SearchBar';
import { DestinationModal } from '../../components/modals/DestinationModal';
import { CalendarModal } from '../../components/modals/CalendarModal';
import { GuestsModal } from '../../components/modals/GuestModal';
import { ListingGrid } from '../../components/ListingGrid';
import { type Property } from '../../components/ListingCard';
import { FilterBar } from '../../components/FilterBar';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Home() {
  const [listings, setListings] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);

  const isInitialMount = useRef(true);

  const fetchListings = useCallback(
    async (endpoint: string = '/property', params: object = {}) => {
      setIsLoading(true);
      setApiError('');

      try {
        const response = await axios.get(`${API_URL}${endpoint}`, { params });
        setListings(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setListings([]);
          setApiError('Nenhum imóvel encontrado para esta busca.');
        } else {
          setApiError('Erro ao carregar imóveis. Tente novamente.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchListings('/property');
  }, [fetchListings]);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!checkIn || !checkOut) {
      setApiError('Por favor, selecione data de Check-in e Checkout.');
      return;
    }

    const dateStart = new Date(checkIn).toISOString();
    const dateEnd = new Date(checkOut).toISOString();

    const params: {
      dateStart: string;
      dateEnd: string;
      guests: string;
      state?: string;
    } = {
      dateStart,
      dateEnd,
      guests,
    };

    if (destination) {
      params.state = destination;
    }

    fetchListings('/property/available', params);
  };

  const handleLocationFilter = () => {
    if (!filterLocation) {
      fetchListings('/property');
      return;
    }
    fetchListings(`/property/city/${filterLocation}`);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (filterRating !== 'all') {
      fetchListings('/property/ranked-by-valuation');
    } else {
      fetchListings('/property');
    }
  }, [filterRating, fetchListings]);

  const openDestinationModal = () => setIsDestinationModalOpen(true);
  const openCalendarModal = () => setIsCalendarModalOpen(true);
  const openGuestsModal = () => setIsGuestsModalOpen(true);

  return (
    <>
      <Header />
      <Banner />
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

      <main className='container mx-auto p-4 md:p-8'>
        <div className='mb-6 flex flex-col items-center justify-between md:flex-row'>
          <h2 className='mb-4 text-3xl font-bold text-[#1D3557] md:mb-0'>
            {destination ? `Resultados para "${destination}"` : 'Destaques'}
          </h2>

          <FilterBar
            filterLocation={filterLocation}
            setFilterLocation={setFilterLocation}
            filterRating={filterRating}
            setFilterRating={setFilterRating}
            onApplyLocationFilter={handleLocationFilter}
          />
        </div>

        {isLoading ? (
          <p className='text-center text-gray-600'>Carregando imóveis...</p>
        ) : apiError ? (
          <p className='text-center text-red-600'>{apiError}</p>
        ) : listings.length > 0 ? (
          <ListingGrid listings={listings} />
        ) : (
          <p className='text-center text-gray-600'>Nenhum imóvel encontrado.</p>
        )}
      </main>

      <Footer />

      {isDestinationModalOpen && (
        <DestinationModal
          onClose={() => setIsDestinationModalOpen(false)}
          onSelect={(value: string) => {
            setDestination(value);
            setIsDestinationModalOpen(false);
          }}
        />
      )}
      {isCalendarModalOpen && (
        <CalendarModal
          onClose={() => setIsCalendarModalOpen(false)}
          onApply={(inDate: string, outDate: string) => {
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
          onApply={(value: string) => {
            setGuests(value);
            setIsGuestsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
