import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import PaymentForm from '../../components/paymentForm';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, formData, ticketData } = location.state || {};
  console.log(ticketData);
  const handlePaymentSuccess = async () => {
    try {
      await Promise.all(
        selectedSeats.map((seat) =>
          axios.post('http://localhost:5000/update-seat-status', {
            seatNumber: seat,
            status: 'occupied',
            email: formData.email,
            typeBus: ticketData.typeBus,
            formData: formData,
          }),
        ),
      );
      alert('Оплата прошла успешно!');
      navigate('/');
    } catch (error) {
      console.error('Error updating seat status:', error);
      alert('Произошла ошибка при обновлении статуса мест. Пожалуйста, свяжитесь с поддержкой.');
    }
  };

  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4 mt-10">
      <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
    </div>
  );
}

export default Payment;
