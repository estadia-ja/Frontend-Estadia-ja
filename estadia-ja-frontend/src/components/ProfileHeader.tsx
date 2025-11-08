import { Edit, Star } from 'lucide-react';
import { type User, type Phone } from '../pages/ProfilePage/index';

type ProfileHeaderProps = {
  user: User;
};

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#1D3557]">{user.name}</h2>
            
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-lg text-gray-700">{user.email}</span>
              <button title="Editar Email" className="text-[#1D3557] hover:text-[#457B9D]">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-lg text-gray-700">{user.cpf}</span>
              <button title="Editar CPF" className="text-[#1D3557] hover:text-[#457B9D]">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            {user.phones && user.phones.map((phone: Phone) => (
              <div 
                key={phone.id}
                className="flex items-center justify-center md:justify-start gap-2"
              >
                <span className="text-lg text-gray-700">{phone.phone}</span>
                <button title="Editar Telefone" className="text-[#1D3557] hover:text-[#457B9D]">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>

      <div className="flex-shrink-0 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#1D3557] mb-2">Avaliações</h3>
        {/* <p className="text-lg text-gray-700">➔ 56 estadias</p> */}
        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          <span className="text-3xl font-bold text-gray-800">{user.avgRating || "Não tem avaliação."}</span>
        </div>
      </div>
    </div>
  );
}
