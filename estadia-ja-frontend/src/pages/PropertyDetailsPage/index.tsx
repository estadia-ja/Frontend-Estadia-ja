import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Heart } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { type Property } from '../../components/ListingCard';
import { ImageGallery } from '../../components/ImageGallery';
import { DescriptionBlock } from '../../components/DescriptionBlock';
import { ReviewsBlock } from '../../components/ReviewsBlock';
import { BookingCalendar } from '../../components/BookingCalendar';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type PropertyUser = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type FullProperty = Property & {
  maxGuests: number;
  numberOfBedroom: number;
  numberOfBathroom: number;
  user: PropertyUser;
};

export type ReviewUser = {
  name: string;
  avatarUrl?: string;
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  user: ReviewUser;
};

const getInitialDateRange = (
  checkIn: string | null,
  checkOut: string | null
): DateRange | undefined => {
  console.log(checkIn, checkOut);
  if (checkIn && checkOut) {
    try {
      const from = new Date(checkIn.replace(/-/g, '/'));
      const to = new Date(checkOut.replace(/-/g, '/'));

      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        return { from, to };
      }
    } catch (error) {
      console.error('Data da URL inválida:', error);
      return undefined;
    }
  }
  return undefined;
};

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const [property, setProperty] = useState<FullProperty | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const initialCheckIn = searchParams.get('checkIn');
  const initialCheckOut = searchParams.get('checkOut');

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getInitialDateRange(initialCheckIn, initialCheckOut)
  );

  const handleFetchError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { data: [] };
    }
    throw error;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      setApiError(null);

      try {
        const propertyPromise = axios.get(`${API_URL}/property/${id}`);
        const reviewsPromise = axios
          .get(`${API_URL}/property/${id}/valuations`)
          .catch(handleFetchError);

        const [propertyResponse, reviewsResponse] = await Promise.all([
          propertyPromise,
          reviewsPromise,
        ]);

        setProperty(propertyResponse.data);
        setReviews(reviewsResponse.data || []);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
        setApiError('Não foi possível carregar os dados do imóvel.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleReserve = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert('Por favor, selecione as datas de check-in e check-out.');
      return;
    }
    console.log('Reservando...', {
      propertyId: id,
      from: dateRange.from,
      to: dateRange.to,
    });
  };

  if (isLoading) {
    return (
      <div className='container mx-auto p-8 text-center'>Carregando...</div>
    );
  }

  if (apiError || !property) {
    return (
      <div className='container mx-auto p-8 text-center text-red-600'>
        {apiError}
      </div>
    );
  }

  const title = `${property.type} em ${property.city}, ${property.state}`;
  const imagesToDisplay = property.images
    .slice(0, 5)
    .map((img) => `${API_URL}/property/image/${img.id}`);

  return (
    <div className='container mx-auto max-w-7xl p-4 md:p-8'>
      <div className='mb-4 flex items-start justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-[#1D3557]'>{title}</h1>
          <div className='mt-2 flex items-center gap-2'>
            <Star className='h-5 w-5 fill-yellow-500 text-yellow-500' />
            <span className='font-bold'>
              {property.avgRating?.toFixed(1) || 'Novo'}
            </span>
            <span className='text-gray-600'>· {reviews.length} avaliações</span>
          </div>
        </div>
        <button className='rounded-full p-3 hover:bg-gray-100'>
          <Heart className='h-6 w-6 text-[#1D3557]' />
        </button>
      </div>

      <ImageGallery images={imagesToDisplay} />

      <div className='mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3'>
        <div className='space-y-8 lg:col-span-2'>
          <DescriptionBlock property={property} />
          <ReviewsBlock reviews={reviews} />
        </div>

        <div className='lg:col-span-1'>
          <BookingCalendar
            dateRange={dateRange}
            setDateRange={setDateRange}
            onReserve={handleReserve}
          />
        </div>
      </div>
    </div>
  );
}
