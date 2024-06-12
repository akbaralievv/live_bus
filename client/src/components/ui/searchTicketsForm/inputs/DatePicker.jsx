import { useEffect, useState } from 'react';
import { Datepicker } from 'flowbite-react';
import PropTypes from 'prop-types';

function DatePicker({ onSelectDate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    onSelectDate(selectedDate);
  }, [selectedDate, onSelectDate]);

  const handleChange = (date) => {
    setSelectedDate(date.target.value);
    onSelectDate(date.target.value);
  };

  return (
    <Datepicker
      selected={selectedDate}
      onSelect={handleChange}
      onChange={handleChange}
      minDate={new Date()}
      maxDate={new Date(2025, 1, 1)}
      weekStart={1}
      language="ru-RU"
      labelTodayButton="Сегодня"
      labelClearButton="Сбросить"
      className="datepicker w-full 487:w-56 z-10"
    />
  );
}

DatePicker.propTypes = {
  onSelectDate: PropTypes.func.isRequired,
};

export default DatePicker;
