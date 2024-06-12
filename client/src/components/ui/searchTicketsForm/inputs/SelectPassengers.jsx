import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function SelectPassengers({ onChange }) {
  const [openOptions, setIsOpenOptions] = useState(false);
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [inputValue, setInputValue] = useState('Взрослые 1, Дети 0, Младенцы 0');

  const optionsRef = useRef(null);

  const updateCount = useCallback((key, delta) => {
    setCounts((prevCounts) => {
      const newCount = prevCounts[key] + delta;
      const updatedCounts = {
        ...prevCounts,
        [key]: key === 'adults' ? Math.max(newCount, 1) : Math.max(newCount, 0),
      };
      return updatedCounts;
    });
  }, []);

  useEffect(() => {
    onChange(counts);
    const { adults, children, infants } = counts;
    setInputValue(`Взрослые ${adults}, Дети ${children}, Младенцы ${infants}`);
  }, [counts, onChange]);

  const handleOpenOptions = () => setIsOpenOptions(!openOptions);

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setIsOpenOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderCounter = (label, key) => (
    <li className="flex justify-between items-center p-2.5" key={key}>
      <p>{label}</p>
      <div className="flex items-center justify-between gap-4">
        <button
          className="w-7 text-white rounded-lg flex items-center justify-center bg-buttonColor"
          onClick={() => updateCount(key, -1)}>
          -
        </button>
        <span>{counts[key]}</span>
        <button
          className="w-7 text-white rounded-lg flex items-center justify-center bg-buttonColor"
          onClick={() => updateCount(key, 1)}>
          +
        </button>
      </div>
    </li>
  );

  return (
    <div
      ref={optionsRef}
      className="z-10 flex items-center justify-start relative w-full 487:w-72 h-12 rounded-2xl bg-white">
      <input
        className="cursor-pointer w-full border-0 bg-transparent outline-none focus:ring-0 focus:border-transparent"
        type="text"
        placeholder="Пассажиры"
        readOnly
        value={inputValue}
        onClick={handleOpenOptions}
      />
      {openOptions && (
        <div className="absolute rounded-3xl bg-white p-2.5 w-full shadow bottom-[-156px]">
          <ul className="overflow-auto max-h-44">
            {renderCounter('Взрослые', 'adults')}
            {renderCounter('Дети', 'children')}
            {renderCounter('Младенцы', 'infants')}
          </ul>
        </div>
      )}
    </div>
  );
}

SelectPassengers.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SelectPassengers;
