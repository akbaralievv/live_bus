import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const citys = ['Бишкек', 'Ош', 'Джалал-Абад', 'Ыссык-Кол', 'Талас', 'Нарын', 'Баткен'];

function SelectCity({ placeholder }) {
  const [openOptions, setIsOpenOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const optionsRef = useRef(null);

  const handleOpenOptions = () => setIsOpenOptions(!openOptions);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpenOptions(false);
  };

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

  return (
    <div
      ref={optionsRef}
      className="flex items-center justify-start relative w-full 487:w-56 h-12 rounded-2xl bg-white">
      <input
        className="cursor-pointer w-full border-0 bg-transparent outline-none focus:ring-0 focus:border-transparent"
        type="text"
        placeholder={placeholder}
        value={selectedOption}
        readOnly
        onClick={handleOpenOptions}
      />
      {openOptions && (
        <div className="z-10 absolute rounded-3xl bg-white p-2.5 w-full shadow bottom-[-200px]">
          <ul className="overflow-auto max-h-44">
            {citys.map((city, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(city)}
                className="p-2.5 rounded-2xl hover:bg-customWhite cursor-pointer">
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectCity;

SelectCity.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
