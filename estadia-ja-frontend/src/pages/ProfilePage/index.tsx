import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../lib/api';
import { type Property } from '../../components/ListingCard';
import { type ReservationWithProperty } from '../../components/ReservationCard';
import { ProfileHeader } from '../../components/ProfileHeader';
import { ReservationsBlock } from '../../components/ReservationsBlock';
import { BecomeOwnerBlock } from '../../components/BecomeOwnerBlock';
import { AnalyticsBlock } from '../../components/AnalyticsBlock';
import { MyPropertiesBlock } from '../../components/MyPropertiesBlock';
import { OwnerReservationsBlock } from '../../components/OwnerReservationsBlock';
import { ErrorModal } from '../../components/modals/ErrorModal';
import { SuccessModal } from '../../components/modals/SuccessModal';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { UpdateReservationModal } from '../../components/modals/UpdateReservationModal';
import { PaymentModal } from '../../components/modals/PaymentModal';
import { RatingModal } from '../../components/modals/RatingModal';
import { ClientRatingModal } from '../../components/modals/ClientRatingModal';
import { type DateRange } from 'react-day-picker';
import { isSameDay } from 'date-fns';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export type Phone = {
  id: string;
  phone: string;
};

export type User = {
  name: string;
  email: string;
  cpf: string;
  phones: Phone[];
  avatarUrl: string;
  avgRating: string;
};

export type Reservation = ReservationWithProperty;

export function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [ownerReservations, setOwnerReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [reservationToRate, setReservationToRate] =
    useState<Reservation | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isClientRatingModalOpen, setIsClientRatingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [reservationToPay, setReservationToPay] = useState<Reservation | null>(
    null
  );
  const [reservationToUpdate, setReservationToUpdate] =
    useState<Reservation | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFetchError = (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 404 || error.response?.status === 401)
    ) {
      return { data: [] };
    }
    throw error;
  };

  const showErrorModal = (message: string) => {
    setModalMessage(message);
    setIsErrorModalOpen(true);
  };

  const showSuccessModal = (message: string) => {
    setModalMessage(message);
    setIsSuccessModalOpen(true);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setApiError(null);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setIsLoading(false);
      showErrorModal('Usuário não autenticado.');
      return;
    }

    try {
      const userPromise = api.get(`/user/${userId}`);
      const propertiesPromise = api
        .get(`/property/my-properties`)
        .catch(handleFetchError);
      const reservationsPromise = api
        .get(`/reserve/my-reservations`)
        .catch(handleFetchError);
      const ownerReservationsPromise = api
        .get(`/reserve/owner`)
        .catch(handleFetchError);

      const [
        userResponse,
        propertiesResponse,
        reservationsResponse,
        ownerReservationsResponse,
      ] = await Promise.all([
        userPromise,
        propertiesPromise,
        reservationsPromise,
        ownerReservationsPromise,
      ]);

      const avatarUrl = `${API_URL}/user/${userId}/image`;

      setUser({ ...userResponse.data, avatarUrl });
      setMyProperties(propertiesResponse.data || []);
      setMyReservations(reservationsResponse.data || []);
      setOwnerReservations(ownerReservationsResponse.data || []);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil:', error);
      if (!axios.isAxiosError(error) || error.response?.status !== 401) {
        showErrorModal('Falha ao carregar dados do perfil. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProperty = (id: string) => {
    navigate(`/property/edit/${id}`);
  };

  const handleDeleteProperty = async (id: string) => {
    setModalTitle('Deletar Imóvel');
    setModalMessage(
      'Tem certeza que deseja deletar este imóvel? Esta ação é permanente.'
    );
    setOnConfirmAction(() => () => executeDeleteProperty(id));
    setIsConfirmModalOpen(true);
  };

  const executeDeleteProperty = async (id: string) => {
    setIsActionLoading(true);
    try {
      await api.delete(`/property/${id}`);
      setMyProperties((prev) => prev.filter((prop) => prop.id !== id));
      showSuccessModal('Imóvel deletado com sucesso.');
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
      showErrorModal('Falha ao deletar imóvel.');
    } finally {
      setIsConfirmModalOpen(false);
      setIsActionLoading(false);
    }
  };

  const handleUpdateReservation = (id: string) => {
    const reservation = myReservations.find((r) => r.id === id);
    if (reservation) {
      setReservationToUpdate(reservation);
      setIsUpdateModalOpen(true);
    }
  };

  const executeUpdateReservation = async (newDateRange: DateRange) => {
    const reservationId = reservationToUpdate?.id;
    if (!reservationId || !newDateRange.from || !newDateRange.to) {
      showErrorModal('Erro: dados da atualização incompletos.');
      return;
    }
    if (isSameDay(newDateRange.from, newDateRange.to)) {
      showErrorModal(
        'A data de checkout deve ser pelo menos um dia depois do check-in.'
      );
      return;
    }
    setIsActionLoading(true);
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
      await api.put(`/reserve/${reservationId}`, payload);
      showSuccessModal('Reserva atualizada com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error);
      let errorMessage = 'Falha ao atualizar reserva.';
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorModal(errorMessage);
    } finally {
      setIsActionLoading(false);
      setIsUpdateModalOpen(false);
    }
  };

  const handleCancelReservation = (id: string) => {
    setModalTitle('Cancelar Reserva');
    setModalMessage('Tem certeza que deseja cancelar esta reserva?');
    setOnConfirmAction(() => () => executeCancelReservation(id));
    setIsConfirmModalOpen(true);
  };

  const executeCancelReservation = async (id: string) => {
    setIsActionLoading(true);
    try {
      await api.delete(`/reserve/${id}`);
      setMyReservations((prev) => prev.filter((res) => res.id !== id));
      showSuccessModal('Reserva cancelada com sucesso.');
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
      showErrorModal('Falha ao cancelar reserva.');
    } finally {
      setIsConfirmModalOpen(false);
      setIsActionLoading(false);
    }
  };

  const handleOpenPayModal = (reservation: Reservation) => {
    setReservationToPay(reservation);
    setIsPaymentModalOpen(true);
  };

  const executePayment = async (paymentMethod: string) => {
    const reservationId = reservationToPay?.id;
    if (!reservationId) {
      showErrorModal('Erro: não foi possível identificar a reserva.');
      return;
    }
    setIsActionLoading(true);
    try {
      const payload = { paymentMethod };
      await api.post(`/reserve/${reservationId}/payment`, payload);
      showSuccessModal('Pagamento efetuado com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      let errorMessage = 'Falha ao processar pagamento.';
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorModal(errorMessage);
    } finally {
      setIsPaymentModalOpen(false);
      setIsActionLoading(false);
    }
  };

  const handleOpenPropertyRatingModal = (reservation: Reservation) => {
    setReservationToRate(reservation);
    setIsRatingModalOpen(true);
  };

  const executeCreatePropertyRating = async (
    rating: number,
    comment: string
  ) => {
    const reservationId = reservationToRate?.id;
    if (!reservationId) {
      showErrorModal('Erro: não foi possível identificar a reserva.');
      return;
    }
    setIsActionLoading(true);
    try {
      const payload = { rating, comment };
      await api.post(`/reserve/${reservationId}/property-valuation`, payload);
      showSuccessModal('Avaliação enviada com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      let errorMessage = 'Falha ao enviar avaliação.';
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorModal(errorMessage);
    } finally {
      setIsRatingModalOpen(false);
      setIsActionLoading(false);
    }
  };

  const handleOpenClientRatingModal = (reservation: Reservation) => {
    setReservationToRate(reservation);
    setIsClientRatingModalOpen(true);
  };

  const executeCreateClientRating = async (rating: number, comment: string) => {
    const reservationId = reservationToRate?.id;
    if (!reservationId) {
      showErrorModal('Erro: não foi possível identificar a reserva.');
      return;
    }
    setIsActionLoading(true);
    try {
      const payload = { noteClient: rating, commentClient: comment };
      await api.post(`/reserve/${reservationId}/client-valuation`, payload);
      showSuccessModal('Avaliação do hóspede enviada com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Erro ao avaliar hóspede:', error);
      let errorMessage = 'Falha ao avaliar hóspede.';
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorModal(errorMessage);
    } finally {
      setIsClientRatingModalOpen(false);
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className='flex flex-grow items-center justify-center bg-[#A8DADC]'
        data-testid='profile-page-loading'
      >
        <p className='text-lg'>Carregando perfil...</p>
      </div>
    );
  }

  if (apiError && !user) {
    return (
      <ErrorModal
        message={apiError}
        onClose={() => {
          setApiError(null);
          navigate('/login');
        }}
      />
    );
  }

  if (!user) {
    return (
      <div
        className='flex flex-grow items-center justify-center bg-[#A8DADC]'
        data-testid='profile-page-user-error'
      >
        <p className='text-lg text-red-700'>
          Erro ao carregar dados do usuário.
        </p>
      </div>
    );
  }

  const isOwner = myProperties && myProperties.length > 0;

  return (
    <>
      <Header />
      <div
        className='flex-grow bg-[#fff] p-4 md:p-8'
        data-testid='profile-page-container'
      >
        <div className='container mx-auto max-w-7xl space-y-10'>
          <ProfileHeader user={user} />

          <ReservationsBlock
            reservations={myReservations}
            onUpdate={handleUpdateReservation}
            onCancel={handleCancelReservation}
            onPay={handleOpenPayModal}
            onRate={handleOpenPropertyRatingModal}
            isLoading={isActionLoading}
          />

          {!isOwner && <BecomeOwnerBlock />}

          {isOwner && (
            <div data-testid='profile-owner-section'>
              <AnalyticsBlock />
              <OwnerReservationsBlock
                reservations={ownerReservations}
                onRateClient={handleOpenClientRatingModal}
                isLoading={isActionLoading}
              />
              <MyPropertiesBlock
                myProperties={myProperties}
                onEdit={handleEditProperty}
                onDelete={handleDeleteProperty}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
      {isConfirmModalOpen && onConfirmAction && (
        <ConfirmModal
          title={modalTitle}
          message={modalMessage || ''}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={onConfirmAction}
          isLoading={isActionLoading}
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
          isLoading={isActionLoading}
          disabledDates={[]}
        />
      )}

      {isPaymentModalOpen && reservationToPay && (
        <PaymentModal
          reservation={reservationToPay}
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={executePayment}
          isLoading={isActionLoading}
        />
      )}

      {isRatingModalOpen && reservationToRate && (
        <RatingModal
          onClose={() => setIsRatingModalOpen(false)}
          onConfirm={executeCreatePropertyRating}
          isLoading={isActionLoading}
        />
      )}

      {isClientRatingModalOpen && reservationToRate && (
        <ClientRatingModal
          onClose={() => setIsClientRatingModalOpen(false)}
          onConfirm={executeCreateClientRating}
          isLoading={isActionLoading}
        />
      )}
    </>
  );
}
