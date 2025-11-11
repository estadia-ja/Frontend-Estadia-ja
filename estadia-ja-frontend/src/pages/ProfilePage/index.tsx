import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
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
    if (axios.isAxiosError(error) && error.response?.status === 404) {
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

    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setIsLoading(false);
      setApiError('Usuário não autenticado.');
      return;
    }

    const authHeaders = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const userPromise = axios.get(`${API_URL}/user/${userId}`);
      const propertiesPromise = axios
        .get(`${API_URL}/property/my-properties`, authHeaders)
        .catch(handleFetchError);
      const reservationsPromise = axios
        .get(`${API_URL}/reserve/my-reservations`, authHeaders)
        .catch(handleFetchError);
      const ownerReservationsPromise = axios
        .get(`${API_URL}/reserve/owner`, authHeaders)
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
      setApiError('Falha ao carregar dados do perfil. Tente novamente.');
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
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`${API_URL}/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    const token = localStorage.getItem('authToken');
    const reservationId = reservationToUpdate?.id;

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

      await axios.put(`${API_URL}/reserve/${reservationId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`${API_URL}/reserve/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  if (isLoading) {
    return (
      <div className='flex flex-grow items-center justify-center bg-[#A8DADC]'>
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
      <div className='flex flex-grow items-center justify-center bg-[#A8DADC]'>
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
      <div className='flex-grow bg-[#fff] p-4 md:p-8'>
        <div className='container mx-auto max-w-7xl space-y-10'>
          <ProfileHeader user={user} />

          <ReservationsBlock
            reservations={myReservations}
            onUpdate={handleUpdateReservation}
            onCancel={handleCancelReservation}
            isLoading={isActionLoading}
          />

          {!isOwner && <BecomeOwnerBlock />}

          {isOwner && (
            <>
              <AnalyticsBlock />
              <OwnerReservationsBlock
                reservations={ownerReservations}
                isLoading={isActionLoading}
              />
              <MyPropertiesBlock
                myProperties={myProperties}
                onEdit={handleEditProperty}
                onDelete={handleDeleteProperty}
              />
            </>
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
    </>
  );
}
