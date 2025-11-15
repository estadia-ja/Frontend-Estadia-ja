import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Home, ArrowLeft, Upload } from 'lucide-react';
import {
  BasicInfoForm,
  AddressForm,
  PropertyDetailsForm,
  AmenitiesForm,
  DescriptionForm,
  ImageUploadForm,
} from '../../components/FormSectins';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function NewProperty() {
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [maxGuests, setMaxGuests] = useState('1');
  const [numberOfBedroom, setNumberOfBedroom] = useState('1');
  const [numberOfSuite, setNumberOfSuite] = useState('0');
  const [numberOfGarage, setNumberOfGarage] = useState('0');
  const [numberOfRoom, setNumberOfRoom] = useState('1');
  const [numberOfBathroom, setNumberOfBathroom] = useState('1');
  const [outdoorArea, setOutdoorArea] = useState(false);
  const [pool, setPool] = useState(false);
  const [barbecue, setBarbecue] = useState(false);
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [CEP, setCEP] = useState('');
  const [dailyRate, setDailyRate] = useState('100');
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setApiError(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setApiError('Você não está autenticado.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    const formattedCEP = CEP.replace(/\D/g, '').replace(
      /(\d{5})(\d{3})/,
      '$1-$2'
    );

    formData.append('type', type);
    formData.append('description', description);
    formData.append('street', street);
    formData.append('neighborhood', neighborhood);
    formData.append('state', state.toUpperCase());
    formData.append('city', city);
    formData.append('CEP', formattedCEP);
    formData.append('maxGuests', maxGuests);
    formData.append('numberOfBedroom', numberOfBedroom);
    formData.append('numberOfSuite', numberOfSuite);
    formData.append('numberOfGarage', numberOfGarage);
    formData.append('numberOfRoom', numberOfRoom);
    formData.append('numberOfBathroom', numberOfBathroom);
    formData.append('number', number);
    formData.append('dailyRate', dailyRate);
    formData.append('outdoorArea', String(outdoorArea === true));
    formData.append('pool', String(pool === true));
    formData.append('barbecue', String(barbecue === true));

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      const response = await axios.post(`${API_URL}/property`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Propriedade criada:', response.data);
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao criar propriedade:', error);

      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setApiError(error.response.data.error);
      } else {
        setApiError('Falha ao criar propriedade.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen bg-[#F1FAEE] font-sans'>
      <div className='hidden items-center justify-center bg-[#457B9D] p-12 md:flex md:w-1/3'>
        <Home className='h-32 w-32 text-[#1D3557]' />
      </div>

      <div className='flex w-full items-start justify-center p-6 md:w-2/3 md:p-12'>
        <div className='w-full max-w-2xl'>
          <Link
            to='/perfil'
            className='mb-8 flex items-center text-sm text-[#1D3557] hover:underline'
            data-testid='new-property-back-link'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='ml-1'>Voltar para o perfil</span>
          </Link>

          <h1
            className='mb-8 text-4xl font-bold text-[#1D3557]'
            data-testid='new-property-title'
          >
            Cadastre seu imóvel
          </h1>

          <form
            onSubmit={handleSubmit}
            className='w-full space-y-6'
            data-testid='new-property-form'
          >
            <BasicInfoForm
              type={type}
              setType={setType}
              dailyRate={dailyRate}
              setDailyRate={setDailyRate}
            />

            <AddressForm
              street={street}
              setStreet={setStreet}
              number={number}
              setNumber={setNumber}
              neighborhood={neighborhood}
              setNeighborhood={setNeighborhood}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              CEP={CEP}
              setCEP={setCEP}
            />

            <PropertyDetailsForm
              maxGuests={maxGuests}
              setMaxGuests={setMaxGuests}
              numberOfBedroom={numberOfBedroom}
              setNumberOfBedroom={setNumberOfBedroom}
              numberOfSuite={numberOfSuite}
              setNumberOfSuite={setNumberOfSuite}
              numberOfBathroom={numberOfBathroom}
              setNumberOfBathroom={setNumberOfBathroom}
              numberOfRoom={numberOfRoom}
              setNumberOfRoom={setNumberOfRoom}
              numberOfGarage={numberOfGarage}
              setNumberOfGarage={setNumberOfGarage}
            />

            <AmenitiesForm
              pool={pool}
              setPool={setPool}
              barbecue={barbecue}
              setBarbecue={setBarbecue}
              outdoorArea={outdoorArea}
              setOutdoorArea={setOutdoorArea}
            />

            <DescriptionForm
              description={description}
              setDescription={setDescription}
            />

            <ImageUploadForm
              onImageChange={handleImageChange}
              imagePreviews={imagePreviews}
            />

            {apiError && (
              <p
                className='pt-2 text-center text-sm text-red-600'
                data-testid='new-property-api-error'
              >
                {apiError}
              </p>
            )}

            <button
              type='submit'
              className='mt-6 w-full rounded-full bg-[#1D3557] py-3 text-lg font-semibold text-white transition-colors hover:bg-opacity-90 disabled:opacity-50'
              disabled={isLoading}
              data-testid='new-property-submit-button'
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              <Upload className='ml-2 inline h-5 w-5' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
