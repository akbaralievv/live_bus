import { useState } from 'react';
import { format, isValid } from 'date-fns';
import { useDispatch } from 'react-redux';
import { ru } from 'date-fns/locale';

import DatePicker from './inputs/DatePicker';
import SelectCity from './inputs/SelectCity';
import SelectPassengers from './inputs/SelectPassengers';
import { fetchTicketsAll } from '../../../api';

function SearchTicketsForm() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });

  const dispacth = useDispatch();

  const handleSubmit = () => {
    let formattedDate = '';

    if (date) {
      const parsedDate = new Date(date);
      if (isValid(parsedDate)) {
        formattedDate = format(parsedDate, 'd MMMM yyyy', { locale: ru }).replace(
          /(\d{4})\sг\./,
          '$1г.',
        );
      } else {
        formattedDate = date.replace(/(\d{4})\sг\./, '$1г.');
      }
    }
    const searchData = {
      fromCity,
      toCity,
      date: formattedDate,
      passengers,
    };
    dispacth(fetchTicketsAll(searchData));
  };

  const handleReset = () => {
    setFromCity('');
    setToCity('');
    setDate('');
    setPassengers({ adults: 1, children: 0, infants: 0 });
    dispacth(fetchTicketsAll({}));
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 min-h-28 rounded-2xl shadow my-4 p-4 bg-customWhite dark:bg-gray-800">
      <SelectCity placeholder="Откуда" onSelect={(city) => setFromCity(city)} />
      <SelectCity placeholder="Куда" onSelect={(city) => setToCity(city)} />
      <DatePicker onSelectDate={(selectedDate) => setDate(selectedDate)} />
      <SelectPassengers onChange={(selectedPassengers) => setPassengers(selectedPassengers)} />
      <button
        onClick={handleSubmit}
        className="h-12 w-full 487:w-52 flex items-center justify-center bg-white rounded-2xl">
        Найти билеты
      </button>
      <button
        onClick={handleReset}
        className="h-12 w-full 487:w-52 flex items-center justify-center bg-white rounded-2xl">
        Очистить
      </button>
    </div>
  );
}

export default SearchTicketsForm;
