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
import { ConfirmReservationModal } from '../../components/modals/ConfirmReservationModal';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ErrorModal } from '../../components/modals/ErrorModal';
import { SuccessModal } from '../../components/modals/SuccessModal';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { UpdateReservationModal } from '../../components/modals/UpdateReservationModal';
import { parseISO, isSameDay } from 'date-fns';

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
  user: {
    id: string;
    name: string;
  };
};
export type Reservation = {
  id: string;
  dateStart: string;
  dateEnd: string;
  propertyId: string;
  userId: string;
};

const getInitialDateRange = (
  checkIn: string | null,
  checkOut: string | null
): DateRange | undefined => {
  if (checkIn && checkOut) {
    try {
      const from = new Date(checkIn.replace(/-/g, '/'));
      const to = new Date(checkOut.replace(/-/g, '/'));
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        return { from, to };
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  return undefined;
};

export function PropertyDetailPage() {
  const { id: propertyId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const [property, setProperty] = useState<FullProperty | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [disabledDates, setDisabledDates] = useState<DateRange[]>([]);
  const [userReservation, setUserReservation] = useState<Reservation | null>(
    null
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);
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
      if (!propertyId) return;

      setIsLoading(true);
      setApiError(null);

      const token = localStorage.getItem('authToken');
      const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const propertyPromise = axios.get(`${API_URL}/property/${propertyId}`);
        const reviewsPromise = axios
          .get(`${API_URL}/property/${propertyId}/valuations`)
          .catch(handleFetchError);
        const allReservationsPromise = axios
          .get(`${API_URL}/property/${propertyId}/reservations`)
          .catch(handleFetchError);
        const myReservationsPromise = token
          ? axios
              .get(`${API_URL}/reserve/my-reservations`, authHeaders)
              .catch(handleFetchError)
          : Promise.resolve({ data: [] });

        const [
          propertyResponse,
          reviewsResponse,
          allReservationsResponse,
          myReservationsResponse,
        ] = await Promise.all([
          propertyPromise,
          reviewsPromise,
          allReservationsPromise,
          myReservationsPromise,
        ]);

        setProperty(propertyResponse.data);
        setReviews(reviewsResponse.data || []);

        const allReservations: Reservation[] =
          allReservationsResponse.data || [];
        const myReservations: Reservation[] = myReservationsResponse.data || [];

        const disabledRanges = allReservations.map((res) => ({
          from: parseISO(res.dateStart),
          to: parseISO(res.dateEnd),
        }));
        setDisabledDates(disabledRanges);

        const foundUserReservation =
          myReservations.find((res) => res.propertyId === propertyId) || null;
        setUserReservation(foundUserReservation);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
        setApiError('Não foi possível carregar os dados do imóvel.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [propertyId, lastUpdated]);

  const showErrorModal = (message: string) => {
    setModalMessage(message);
    setIsErrorModalOpen(true);
  };

  const showSuccessModal = (message: string) => {
    setModalMessage(message);
    setIsSuccessModalOpen(true);
  };

  const handleOpenReserveModal = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      showErrorModal('Você precisa estar logado para fazer uma reserva.');
      return;
    }
    if (!dateRange?.from || !dateRange?.to) {
      showErrorModal('Por favor, selecione as datas de check-in e check-out.');
      return;
    }

    if (isSameDay(dateRange.from, dateRange.to)) {
      showErrorModal(
        'A data de checkout deve ser pelo menos um dia depois do check-in.'
      );
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleConfirmReserve = async () => {
    const token = localStorage.getItem('authToken');
    if (!token || !dateRange?.from || !dateRange?.to || !propertyId) {
      showErrorModal('Erro: dados da reserva incompletos.');
      return;
    }

    setIsBookingLoading(true);
    try {
      const fromDate = dateRange.from;
      const toDate = dateRange.to;

      const checkInDateTime = new Date(
        fromDate.getFullYear(),
        fromDate.getMonth(),
        fromDate.getDate(),
        14,
        0,
        0
      );
      const checkOutDateTime = new Date(
        toDate.getFullYear(),
        toDate.getMonth(),
        toDate.getDate(),
        11,
        0,
        0
      );

      const payload = {
        dateStart: checkInDateTime.toISOString(),
        dateEnd: checkOutDateTime.toISOString(),
      };

      const apiUrl = `${API_URL}/property/${propertyId}/reserve`;

      await axios.post(apiUrl, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showSuccessModal('Reserva confirmada!');
      setIsConfirmModalOpen(false);
      setDateRange(undefined);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Erro ao confirmar reserva:', error);
      let errorMessage = 'Falha ao criar reserva. Tente novamente.';
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      setIsConfirmModalOpen(false);
      showErrorModal(errorMessage);
    } finally {
      setIsBookingLoading(false);
    }
  };

  const handleUpdateReservation = () => {
    setIsUpdateModalOpen(true);
  };

  const executeUpdateReservation = async (newDateRange: DateRange) => {
    const token = localStorage.getItem('authToken');
    const reservationId = userReservation?.id;

    if (!token || !reservationId || !newDateRange.from || !newDateRange.to) {
      showErrorModal('Erro: dados da atualização incompletos.');
      return;
    }

    if (isSameDay(newDateRange.from, newDateRange.to)) {
      showErrorModal(
        'A data de checkout deve ser pelo menos um dia depois do check-in.'
      );
      return;
    }

    setIsBookingLoading(true);
    try {
      const fromDate = newDateRange.from;
      const toDate = newDateRange.to;
      const checkInDateTime = new Date(
        fromDate.getFullYear(),
        fromDate.getMonth(),
        fromDate.getDate(),
        14,
        0,
        0
      );
      const checkOutDateTime = new Date(
        toDate.getFullYear(),
        toDate.getMonth(),
        toDate.getDate(),
        11,
        0,
        0
      );

      const payload = {
        dateStart: checkInDateTime.toISOString(),
        dateEnd: checkOutDateTime.toISOString(),
      };

      await axios.put(`${API_URL}/reserve/${reservationId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showSuccessModal('Reserva atualizada com sucesso!');
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      let errorMessage = 'Falha ao atualizar reserva.';
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorModal(errorMessage);
    } finally {
      setIsBookingLoading(false);
      setIsUpdateModalOpen(false);
    }
  };

  const handleCancelReservation = () => {
    setIsConfirmCancelModalOpen(true);
  };

  const executeCancelReservation = async () => {
    const token = localStorage.getItem('authToken');
    const reservationId = userReservation?.id;

    if (!token || !reservationId) {
      showErrorModal('Você não está logado ou a reserva é inválida.');
      return;
    }

    setIsBookingLoading(true);
    try {
      await axios.delete(`${API_URL}/reserve/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSuccessModal('Reserva cancelada com sucesso!');
      setDateRange(undefined);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
      let errorMessage = 'Falha ao cancelar reserva.';
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorModal(errorMessage);
    } finally {
      setIsBookingLoading(false);
      setIsConfirmCancelModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto p-8 text-center'>Carregando...</div>
    );
  }

  if (apiError && !property) {
    return <ErrorModal message={apiError} onClose={() => setApiError(null)} />;
  }

  if (!property) {
    return (
      <div className='container mx-auto p-8 text-center text-red-600'>
        Imóvel não encontrado.
      </div>
    );
  }

  const title = `${property.type} em ${property.city}, ${property.state}`;
  const imagesToDisplay = property.images
    .slice(0, 5)
    .map((img) => `${API_URL}/property/image/${img.id}`);

  return (
    <>
      <Header />
      <div className='container mx-auto max-w-7xl p-4 md:p-8'>
        <div className='mb-4 flex items-start justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-[#1D3557]'>{title}</h1>
            <div className='mt-2 flex items-center gap-2'>
              <Star className='h-5 w-5 fill-yellow-500 text-yellow-500' />
              <span className='font-bold'>
                {property.avgRating?.toFixed(1) || 'Novo'}
              </span>
              <span className='text-gray-600'>
                · {reviews.length} avaliações
              </span>
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
              onReserveClick={handleOpenReserveModal}
              disabledDates={disabledDates}
              userReservation={userReservation}
              onUpdate={handleUpdateReservation}
              onCancel={handleCancelReservation}
              isLoading={isBookingLoading}
            />
          </div>
        </div>

        {isConfirmModalOpen && (
          <ConfirmReservationModal
            dateRange={dateRange}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmReserve}
            isLoading={isBookingLoading}
          />
        )}

        {isConfirmCancelModalOpen && (
          <ConfirmModal
            title='Cancelar Reserva'
            message='Tem certeza que deseja cancelar esta reserva?'
            onClose={() => setIsConfirmCancelModalOpen(false)}
            onConfirm={executeCancelReservation}
            isLoading={isBookingLoading}
          />
        )}

        {isErrorModalOpen && (
          <ErrorModal
            message={modalMessage}
            onClose={() => setIsErrorModalOpen(false)}
          />
        )}

        {isSuccessModalOpen && (
          <SuccessModal
            message={modalMessage}
            onClose={() => setIsSuccessModalOpen(false)}
          />
        )}

        {isUpdateModalOpen && (
          <UpdateReservationModal
            onClose={() => setIsUpdateModalOpen(false)}
            onConfirm={executeUpdateReservation}
            isLoading={isBookingLoading}
            disabledDates={disabledDates.filter(
              (d) => d.from?.toISOString() !== userReservation?.dateStart
            )}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
