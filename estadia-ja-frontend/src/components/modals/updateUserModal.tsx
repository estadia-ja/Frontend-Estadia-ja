import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { type User } from '../../pages/ProfilePage/index';

type UpdateUserData = {
  name: string;
  email: string;
  phone: string;
};

type UpdateUserModalProps = {
  user: User;
  onClose: () => void;
  onConfirm: (data: UpdateUserData) => void;
  isLoading: boolean;
};

export function UpdateUserModal({
  user,
  onClose,
  onConfirm,
  isLoading,
}: UpdateUserModalProps) {
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  // Pega o primeiro número do array ou string vazia
  const [phone, setPhone] = useState(user.phones?.[0]?.phone || ""); 

  // Função para formatar telefone (XX) XXXXX-XXXX sem biblioteca
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);

    // Aplica a máscara
    if (value.length > 10) {
      // (11) 91234-5678
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) {
      // (11) 91234-
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      // (11) 9
      value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    } else if (value.length > 0) {
      // (1
      value = value.replace(/^(\d*)/, '($1');
    }
    
    setPhone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      name,
      email,
      phone
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#1D3557]">
            Editar Perfil
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200" disabled={isLoading}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1D3557] outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1D3557] outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1D3557] outline-none"
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 rounded-full bg-[#1D3557] text-white font-semibold text-lg hover:bg-opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Salvando..." : "Salvar Alterações"}
            <Save className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}