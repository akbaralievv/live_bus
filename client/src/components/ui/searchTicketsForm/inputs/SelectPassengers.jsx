import { useCallback, useEffect, useRef, useState } from 'react';

function SelectPassengers() {
  const [openOptions, setIsOpenOptions] = useState(false);
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const optionsRef = useRef(null);

  const updateCount = useCallback((key, delta) => {
    setCounts((prevCounts) => {
      const newCount = prevCounts[key] + delta;
      if (key === 'adults') {
        return {
          ...prevCounts,
          [key]: Math.max(newCount, 1),
        };
      } else {
        return {
          ...prevCounts,
          [key]: Math.max(newCount, 0),
        };
      }
    });
  }, []);

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
    <li className="flex justify-between items-center p-2.5">
      <p>{label}</p>
      <div className="flex items-center justify-between gap-2">
        <button
          className="w-6 text-white rounded-lg flex items-center justify-center bg-buttonColor"
          onClick={() => updateCount(key, -1)}>
          -
        </button>
        <span>{counts[key]}</span>
        <button
          className="w-6 text-white rounded-lg flex items-center justify-center bg-buttonColor"
          onClick={() => updateCount(key, 1)}>
          +
        </button>
      </div>
    </li>
  );

  return (
    <div
      ref={optionsRef}
      className="z-10 flex items-center justify-start relative w-full 487:w-56 h-12 rounded-2xl bg-white">
      <input
        className="cursor-pointer w-full border-0 bg-transparent outline-none focus:ring-0 focus:border-transparent"
        type="text"
        placeholder="Пассажиры"
        readOnly
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

export default SelectPassengers;
