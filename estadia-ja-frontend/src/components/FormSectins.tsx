import React from 'react';
import { ImageUp } from 'lucide-react';
import { InputText, InputCheckbox } from './FormInputs';

type FormSectionProps = {
  title: string;
  children: React.ReactNode;
};

function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className='space-y-4'>
      <h2 className='border-b pb-2 text-xl font-semibold text-[#1D3557]'>
        {title}
      </h2>
      {children}
    </div>
  );
}

type BasicInfoFormProps = {
  type: string;
  setType: (value: string) => void;
  dailyRate: string;
  setDailyRate: (value: string) => void;
};

export function BasicInfoForm(props: BasicInfoFormProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <InputText
        label='Tipo do Imóvel (Ex: Casa, Apto)'
        value={props.type}
        onChange={props.setType}
        required
      />
      <InputText
        label='Valor por noite'
        value={props.dailyRate}
        onChange={props.setDailyRate}
        type='number'
        required
      />
    </div>
  );
}

type AddressFormProps = {
  street: string;
  setStreet: (value: string) => void;
  number: string;
  setNumber: (value: string) => void;
  neighborhood: string;
  setNeighborhood: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  CEP: string;
  setCEP: (value: string) => void;
};

export function AddressForm(props: AddressFormProps) {
  return (
    <FormSection title='Endereço'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <InputText
          label='Endereço (Rua)'
          value={props.street}
          onChange={props.setStreet}
          required
        />
        <InputText
          label='Número'
          value={props.number}
          onChange={props.setNumber}
          type='number'
          required
        />
        <InputText
          label='Bairro'
          value={props.neighborhood}
          onChange={props.setNeighborhood}
          required
        />
        <InputText
          label='Cidade'
          value={props.city}
          onChange={props.setCity}
          required
        />
        <InputText
          label='Estado (UF)'
          value={props.state}
          onChange={props.setState}
          maxLength={2}
          required
        />
        <InputText
          label='CEP'
          value={props.CEP}
          onChange={props.setCEP}
          required
        />
      </div>
    </FormSection>
  );
}

type PropertyDetailsFormProps = {
  maxGuests: string;
  setMaxGuests: (value: string) => void;
  numberOfBedroom: string;
  setNumberOfBedroom: (value: string) => void;
  numberOfSuite: string;
  setNumberOfSuite: (value: string) => void;
  numberOfBathroom: string;
  setNumberOfBathroom: (value: string) => void;
  numberOfRoom: string;
  setNumberOfRoom: (value: string) => void;
  numberOfGarage: string;
  setNumberOfGarage: (value: string) => void;
};

export function PropertyDetailsForm(props: PropertyDetailsFormProps) {
  return (
    <FormSection title='Detalhes do Imóvel'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <InputText
          label='Max. Hóspedes'
          value={props.maxGuests}
          onChange={props.setMaxGuests}
          type='number'
          required
        />
        <InputText
          label='Quartos'
          value={props.numberOfBedroom}
          onChange={props.setNumberOfBedroom}
          type='number'
          required
        />
        <InputText
          label='Suítes'
          value={props.numberOfSuite}
          onChange={props.setNumberOfSuite}
          type='number'
          required
        />
        <InputText
          label='Banheiros'
          value={props.numberOfBathroom}
          onChange={props.setNumberOfBathroom}
          type='number'
          required
        />
        <InputText
          label='Salas'
          value={props.numberOfRoom}
          onChange={props.setNumberOfRoom}
          type='number'
          required
        />
        <InputText
          label='Vagas Garagem'
          value={props.numberOfGarage}
          onChange={props.setNumberOfGarage}
          type='number'
          required
        />
      </div>
    </FormSection>
  );
}

type AmenitiesFormProps = {
  pool: boolean;
  setPool: (value: boolean) => void;
  barbecue: boolean;
  setBarbecue: (value: boolean) => void;
  outdoorArea: boolean;
  setOutdoorArea: (value: boolean) => void;
};

export function AmenitiesForm(props: AmenitiesFormProps) {
  return (
    <FormSection title='Comodidades'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <InputCheckbox
          label='Piscina'
          checked={props.pool}
          onChange={props.setPool}
        />
        <InputCheckbox
          label='Churrasqueira'
          checked={props.barbecue}
          onChange={props.setBarbecue}
        />
        <InputCheckbox
          label='Área externa'
          checked={props.outdoorArea}
          onChange={props.setOutdoorArea}
        />
      </div>
    </FormSection>
  );
}

type DescriptionFormProps = {
  description: string;
  setDescription: (value: string) => void;
};

export function DescriptionForm({
  description,
  setDescription,
}: DescriptionFormProps) {
  return (
    <div>
      <label className='mb-1 ml-4 block text-sm font-medium text-[#1D3557]'>
        Descrição
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Descreva seu imóvel...'
        className='h-32 w-full rounded-2xl bg-[#A8DADC] px-6 py-3 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]'
        required
      />
    </div>
  );
}

type ImageUploadFormProps = {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviews: string[];
};

export function ImageUploadForm({
  onImageChange,
  imagePreviews,
}: ImageUploadFormProps) {
  return (
    <div>
      <label className='mb-2 ml-4 block text-sm font-medium text-[#1D3557]'>
        Carregue suas imagens (Até 5)
      </label>
      <label
        htmlFor='images'
        className='flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#1D3557] bg-[#A8DADC] transition-colors hover:bg-opacity-80'
      >
        <ImageUp className='h-10 w-10 text-[#1D3557]' />
        <span className='font-medium text-[#1D3557]'>
          Clique para selecionar
        </span>
      </label>
      <input
        id='images'
        type='file'
        multiple
        accept='image/*'
        onChange={onImageChange}
        className='sr-only'
      />
      <div className='mt-4 flex flex-wrap gap-2'>
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index + 1}`}
            className='h-20 w-20 rounded-lg object-cover'
          />
        ))}
      </div>
    </div>
  );
}
