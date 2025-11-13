import { useState } from 'react';
import { X, CreditCard, Banknote, QrCode } from 'lucide-react';
import { type Reservation } from '../../pages/ProfilePage/index';
import { differenceInCalendarDays, parseISO } from 'date-fns';

type PaymentModalProps = {
  reservation: Reservation;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
  isLoading: boolean;
};

const calculateTotal = (reservation: Reservation) => {
  try {
    const start = parseISO(reservation.dateStart);
    const end = parseISO(reservation.dateEnd);

    const nights = differenceInCalendarDays(end, start) + 1;

    const totalNights = nights > 0 ? nights : 1;
    const total = totalNights * reservation.property.dailyRate;
    return total.toFixed(2).replace('.', ',');
  } catch (error) {
    console.error('Erro ao calcular total:', error);
    return '0,00';
  }
};

export function PaymentModal({
  reservation,
  onClose,
  onConfirm,
  isLoading,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const totalPrice = calculateTotal(reservation);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='flex w-full max-w-md flex-col rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-[#1D3557]'>
            Efetuar Pagamento
          </h2>
          <button
            onClick={onClose}
            className='rounded-full p-2 hover:bg-gray-200'
            disabled={isLoading}
          >
            <X className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <div className='mb-6 text-center'>
          <p className='text-lg text-gray-700'>Valor Total da Reserva:</p>
          <p className='text-4xl font-bold text-[#1D3557]'>R$ {totalPrice}</p>
        </div>

        <div className='mb-6 space-y-3'>
          <h3 className='font-semibold text-gray-700'>
            Selecione o método de pagamento:
          </h3>

          <label
            className={`flex items-center rounded-lg border-2 p-4 ${paymentMethod === 'CREDIT_CARD' ? 'border-[#1D3557] bg-blue-50' : 'border-gray-300'}`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='CREDIT_CARD'
              checked={paymentMethod === 'CREDIT_CARD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='h-5 w-5 text-[#1D3557] focus:ring-[#1D3557]'
            />
            <CreditCard className='mx-3 h-6 w-6 text-gray-700' />
            <span className='font-medium text-gray-800'>Cartão de Crédito</span>
          </label>

          <label
            className={`flex items-center rounded-lg border-2 p-4 ${paymentMethod === 'PIX' ? 'border-[#1D3557] bg-blue-50' : 'border-gray-300'}`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='PIX'
              checked={paymentMethod === 'PIX'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='h-5 w-5 text-[#1D3557] focus:ring-[#1D3557]'
            />
            <QrCode className='mx-3 h-6 w-6 text-gray-700' />
            <span className='font-medium text-gray-800'>PIX</span>
          </label>

          <label
            className={`flex items-center rounded-lg border-2 p-4 ${paymentMethod === 'BOLETO' ? 'border-[#1D3557] bg-blue-50' : 'border-gray-300'}`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='BOLETO'
              checked={paymentMethod === 'BOLETO'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='h-5 w-5 text-[#1D3557] focus:ring-[#1D3557]'
            />
            <Banknote className='mx-3 h-6 w-6 text-gray-700' />
            <span className='font-medium text-gray-800'>Boleto</span>
          </label>
        </div>

        <button
          onClick={() => onConfirm(paymentMethod)}
          disabled={isLoading}
          className='mt-2 w-full rounded-full bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-700 disabled:opacity-50'
        >
          {isLoading ? 'Processando...' : `Pagar R$ ${totalPrice}`}
        </button>
      </div>
    </div>
  );
}
