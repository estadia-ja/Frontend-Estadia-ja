import React, { useRef } from 'react';
import { Edit, Star, Trash2, Camera } from 'lucide-react';
import { type User } from '../pages/ProfilePage/index.tsx';

type ProfileHeaderProps = {
  user: User;
  onEdit: () => void;
  onUploadImage: (file: File) => void;
  onDeleteUser: () => void;
};

export function ProfileHeader({ user, onEdit, onUploadImage, onDeleteUser }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadImage(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Foto de Perfil com Upload */}
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-1 space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h2 className="text-3xl font-bold text-[#1D3557]">{user.name}</h2>
              <button onClick={onEdit} title="Editar Perfil" className="text-[#1D3557] hover:text-[#457B9D]">
                <Edit className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1 items-center md:items-start">
              <span className="text-lg text-gray-700">{user.email}</span>
              <span className="text-lg text-gray-700">{user.cpf}</span>
              {user.phones && user.phones.map((phone) => (
                <span key={phone.id} className="text-lg text-gray-700">{phone.phone}</span>
              ))}
            </div>
            
            {/* Botão de Excluir Conta */}
            <button 
              onClick={onDeleteUser}
              className="text-red-500 text-sm hover:underline flex items-center gap-1 mt-2 mx-auto md:mx-0"
            >
              <Trash2 className="w-4 h-4" />
              Excluir minha conta
            </button>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#1D3557] mb-2">Avaliações</h3>
        <p className="text-lg text-gray-700">➔ {user.avgRating ? "Média" : "Sem avaliações"}</p>
        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          <span className="text-3xl font-bold text-gray-800">{user.avgRating ? Number(user.avgRating).toFixed(2) : "-"}</span>
        </div>
      </div>
    </div>
  );
}