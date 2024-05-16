import { Datepicker } from 'flowbite-react';

function DatePicker() {
  return (
    <Datepicker
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

export default DatePicker;
