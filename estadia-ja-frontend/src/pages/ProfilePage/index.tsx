import { useState, useEffect } from 'react';
import { type Property } from '../../components/ListingCard';
import { ProfileHeader } from '../../components/ProfileHeader';
import { ReservationsBlock } from '../../components/ReservationsBlock';
import { BecomeOwnerBlock } from '../../components/BecomeOwnerBlock';
import { AnalyticsBlock } from '../../components/AnalyticsBlock';
import { MyPropertiesBlock } from '../../components/MyPropertiesBlock';
import { Header } from '../../components/Header';
import { Footer } from 'react-day-picker';

export type User = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  avatarUrl: string;
};

export type Reservation = {
  id: string;
};

const MOCK_USER: User = {
  name: 'Nome do Usuário',
  email: 'email@email.com',
  cpf: '000.000.000-00',
  phone: '(61) 9 9876 5432',
  avatarUrl: 'https://placehold.co/128x128/A8DADC/1D3557?text=User',
};

const MOCK_RESERVATIONS: Reservation[] = [];

const MOCK_MY_PROPERTIES: Property[] = [
  {
    id: '3',
    type: 'Chalé',
    city: 'Campos do Jordão',
    dailyRate: 380,
    avgRating: 4.7,
    images: [{ id: '3' }],
    description: '',
    state: '',
  },
];

export function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setUser(MOCK_USER);
        setMyProperties(MOCK_MY_PROPERTIES);
        setMyReservations(MOCK_RESERVATIONS);
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBecomeOwner = () => {
    console.log('Redirecionando...');
  };

  if (isLoading) {
    return (
      <div className='flex flex-grow items-center justify-center bg-[#A8DADC]'>
        <p className='text-lg'>Carregando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex flex-grow items-center justify-center bg-[#A8DADC]'>
        <p className='text-lg text-red-500'>Erro ao carregar dados.</p>
      </div>
    );
  }

  const isOwner = myProperties.length > 0;

  return (
    <>
      <Header />
      <div className='flex-grow bg-[#ffffff] p-4 md:p-8'>
        <div className='container mx-auto max-w-7xl space-y-10'>
          <ProfileHeader user={user} />

          <ReservationsBlock reservations={myReservations} />

          <BecomeOwnerBlock onClick={handleBecomeOwner} />

          {isOwner && (
            <>
              <AnalyticsBlock />
              <MyPropertiesBlock myProperties={myProperties} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
