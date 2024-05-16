import DatePicker from './inputs/DatePicker';
import SelectCity from './inputs/SelectCity';
import SelectPassengers from './inputs/SelectPassengers';

function SearchTicketsForm() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 min-h-28 rounded-2xl shadow my-4 p-4 bg-customWhite dark:bg-gray-800">
      <SelectCity placeholder="Откуда" />
      <SelectCity placeholder="Куда" />
      <DatePicker />
      <SelectPassengers />
      <button className="h-12 w-full 487:w-52 flex items-center justify-center bg-white rounded-2xl">
        Найти билеты
      </button>
    </div>
  );
}

export default SearchTicketsForm;
