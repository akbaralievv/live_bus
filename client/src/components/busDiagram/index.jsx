import { useState } from 'react';

export const WheetIcon = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" stroke="#cecece" strokeWidth="10" fill="none" />
    <circle cx="100" cy="100" r="40" stroke="#cecece" strokeWidth="5" fill="none" />
    <circle cx="100" cy="100" r="20" fill="#cecece" />

    <line x1="100" y1="100" x2="100" y2="20" stroke="#cecece" strokeWidth="5" />
    <line x1="100" y1="100" x2="180" y2="100" stroke="#cecece" strokeWidth="5" />
    <line x1="100" y1="100" x2="100" y2="180" stroke="#cecece" strokeWidth="5" />
    <line x1="100" y1="100" x2="20" y2="100" stroke="#cecece" strokeWidth="5" />
  </svg>
);

const rows = [
  ['9A', '8A', '7A', '6A', '5A', '4A', '3A', '2A', '1A'],
  ['9B', '8B', '7B', '6B', '5B', '4B', '3B', '2B', '1B'],
  ['9C', '8C', '7C', '6C', '5C', '4C', '3C', '2C', '1C'],
];
const occupiedSeats = ['7A', '14B', '22C'];

function BusDiagram() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const passengerCount = 2;

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  return (
    <div className="relative mx-auto flex flex-wrap max-w-[800px] py-5 pr-28 pl-4 rounded-3xl border border-gray-300">
      <div className="absolute top-5 right-5 w-16">
        <WheetIcon />
      </div>
      <div className="grid grid-cols-9 grid-rows-3 gap-y-8 gap-x-4">
        {rows.flat().map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            disabled={occupiedSeats.includes(seat)}
            className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg ${
              selectedSeats.includes(seat)
                ? 'bg-green-500 text-white'
                : occupiedSeats.includes(seat)
                ? 'bg-red-500 text-white cursor-not-allowed'
                : 'bg-gray-200'
            }`}>
            {seat}
          </button>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div className="mt-4">
          <p className="text-lg">Вы выбрали места: {selectedSeats.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default BusDiagram;
