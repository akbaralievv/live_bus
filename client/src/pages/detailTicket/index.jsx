import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import BusDiagram from '../../components/busDiagram';
import FormBuyTicket from '../../components/formBuyTicket';

function DetailTicket() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [formCompleted, setFormCompleted] = useState(false);
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const ticketData = location.state.state || {};

  const handleFormChange = (data) => {
    setFormData(data);
    const isFormCompleted = Object.values(data).every((value) => value);
    setFormCompleted(isFormCompleted);
  };
  const handleProceedToPayment = async () => {
    if (formCompleted && selectedSeats.length > 0) {
      try {
        await Promise.all(
          selectedSeats.map((seat) =>
            axios.post('http://localhost:5000/update-seat-status', {
              seatNumber: seat,
              typeBus: ticketData.typeBus,
              status: 'reserved',
            }),
          ),
        );
        navigate('/payment', { state: { selectedSeats, formData, ticketData } });
      } catch (error) {
        console.error('Error reserving seats:', error);
        alert('Произошла ошибка при резервировании мест. Пожалуйста, попробуйте еще раз.');
      }
    } else {
      alert('Пожалуйста, заполните все поля формы и выберите места.');
    }
  };

  const typeBus =
    ticketData.typeBus === 'economy'
      ? 'Эконом класс'
      : ticketData.typeBus === 'comfort'
      ? 'Комфорт класс'
      : ticketData.typeBus === 'business'
      ? 'Бизнес класс'
      : '';

  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4 mt-10">
      <div className="flex justify-evenly">
        <ul className="flex flex-col gap-2">
          <li className="flex items-start gap-16">
            <div>
              <p className="font-semibold text-2xl">{ticketData.fromTime}</p>
              <span className="text-lg">{ticketData.fromDate}</span>
            </div>
            <p className="font-semibold text-2xl">{ticketData.from}</p>
          </li>
          <li className="flex justify-center flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-textColor"></div>
            <svg className="" width="20" height="115" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="10"
                y1="0"
                x2="10"
                y2="115"
                stroke="rgb(36, 176, 245)"
                strokeWidth="2"
                strokeDasharray="5"
              />
            </svg>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-textColor"></div>
          </li>

          <li className="flex items-start gap-16">
            <div>
              <p className="font-semibold text-2xl">{ticketData.toTime}</p>
              <span className="text-lg">{ticketData.toDate}</span>
            </div>
            <p className="font-semibold text-2xl">{ticketData.to}</p>
          </li>
        </ul>
        <FormBuyTicket setFormCompleted={handleFormChange} />
      </div>
      <div className="my-10 flex items-center flex-col gap-6">
        <h2 className="text-center font-semibold text-2xl">Выберите место на схеме автобуса</h2>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 rounded-lg bg-gray-200"></div>-
            <span className="text-base">свободно</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 rounded-lg bg-red-500"></div>-
            <span className="text-base">занято</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 rounded-lg bg-yellow-500"></div>-
            <span className="text-base">забронировано</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-center mb-4 font-semibold text-xl">{typeBus}</h3>
        <BusDiagram
          setSelectedSeats={setSelectedSeats}
          selectedSeats={selectedSeats}
          passengerCount={formData.passengers}
          typeBus={ticketData.typeBus}
        />
      </div>
      <div className="my-10 flex justify-end items-center gap-10">
        <p className="text-xl">{ticketData.price} сом</p>
        <button
          onClick={handleProceedToPayment}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Перейти к оплате
        </button>
      </div>
    </div>
  );
}

export default DetailTicket;
