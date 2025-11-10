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
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFetchError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { data: [] };
    }
    throw error;
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
    const token = localStorage.getItem('authToken');
    if (window.confirm('Tem certeza que deseja deletar este imóvel?')) {
      try {
        await axios.delete(`${API_URL}/property/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyProperties((prev) => prev.filter((prop) => prop.id !== id));
      } catch (error) {
        console.error('Erro ao deletar imóvel:', error);
      }
    }
  };

  const handleUpdateReservation = (id: string) => {
    alert(`Função 'Atualizar Reserva' (ID: ${id}) não implementada.`);
  };

  const handleCancelReservation = async (id: string) => {
    const token = localStorage.getItem('authToken');
    if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      try {
        await axios.delete(`${API_URL}/reserve/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyReservations((prev) => prev.filter((res) => res.id !== id));
      } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className='flex flex-grow items-center justify-center bg-[#A8DADC]'>
        <p className='text-lg'>Carregando perfil...</p>
      </div>
    );
  }

  if (apiError || !user) {
    return (
      <div className='flex flex-grow items-center justify-center bg-[#A8DADC]'>
        <p className='text-lg text-red-700'>
          {apiError || 'Erro ao carregar dados do usuário.'}
        </p>
      </div>
    );
  }

  const isOwner = myProperties && myProperties.length > 0;

  return (
    <div className='flex-grow bg-[#fff] p-4 md:p-8'>
      <div className='container mx-auto max-w-7xl space-y-10'>
        <ProfileHeader user={user} />

        <ReservationsBlock
          reservations={myReservations}
          onUpdate={handleUpdateReservation}
          onCancel={handleCancelReservation}
        />

        {!isOwner && <BecomeOwnerBlock />}

        {isOwner && (
          <>
            <AnalyticsBlock />
            <OwnerReservationsBlock reservations={ownerReservations} />
            <MyPropertiesBlock
              myProperties={myProperties}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          </>
        )}
      </div>
    </div>
  );
}
