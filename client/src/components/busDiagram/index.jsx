import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { fetchOccupiedSeats } from '../../api';

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

const busLayouts = {
  economy: {
    rows: [
      ['7A', '6A', '5A', '4A', '3A', '2A', '1A'],
      ['7B', '6B', '5B', '4B', '3B', '2B', '1B'],
    ],
    gridCols: 7,
    gridRows: 2,
  },
  comfort: {
    rows: [
      ['8A', '7A', '6A', '5A', '4A', '3A', '2A', '1A'],
      ['8B', '7B', '6B', '5B', '4B', '3B', '2B', '1B'],
    ],
    gridCols: 8,
    gridRows: 2,
  },
  business: {
    rows: [
      ['9A', '8A', '7A', '6A', '5A', '4A', '3A', '2A', '1A'],
      ['9B', '8B', '7B', '6B', '5B', '4B', '3B', '2B', '1B'],
    ],
    gridCols: 9,
    gridRows: 2,
  },
};

function BusDiagram({ typeBus, setSelectedSeats, selectedSeats, passengerCount }) {
  const { occupiedSeatsData } = useSelector((state) => state.occupiedSeatsSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOccupiedSeats(typeBus));
  }, [dispatch, typeBus]);

  const handleSeatClick = (seat) => {
    const seatData = occupiedSeatsData.find((occupiedSeat) => occupiedSeat.seat_number === seat);
    if (seatData && seatData.status === 'occupied') return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getSeatClass = (seat) => {
    const seatData = occupiedSeatsData.find((occupiedSeat) => occupiedSeat.seat_number === seat);
    if (seatData) {
      if (seatData.status === 'occupied') return 'bg-red-500 text-white cursor-not-allowed';
      if (seatData.status === 'reserved') return 'bg-yellow-500 text-white cursor-not-allowed';
    }
    return selectedSeats.includes(seat) ? 'bg-green-500 text-white' : 'bg-gray-200';
  };

  const { rows, gridCols, gridRows } = busLayouts[typeBus];

  const gridClass = classNames({
    'grid-cols-7': gridCols === 7,
    'grid-cols-8': gridCols === 8,
    'grid-cols-9': gridCols === 9,
    'grid-rows-2': gridRows === 2,
  });

  return (
    <div className="relative mx-auto flex flex-wrap max-w-[800px] py-5 pr-28 pl-4 rounded-3xl border border-gray-300">
      <div className="absolute top-5 right-5 w-16">
        <WheetIcon />
      </div>
      <div className={`grid ${gridClass} grid-rows-${gridRows} gap-y-8 gap-x-8`}>
        {rows.flat().map((seat) => {
          const seatData = occupiedSeatsData.find(
            (occupiedSeat) => occupiedSeat.seat_number === seat,
          );
          const seatIsOccupiedOrReserved =
            seatData && (seatData.status === 'occupied' || seatData.status === 'reserved');
          return (
            <button
              key={seat}
              onClick={() => handleSeatClick(seat)}
              disabled={seatIsOccupiedOrReserved}
              className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg ${getSeatClass(
                seat,
              )}`}>
              {seat}
            </button>
          );
        })}
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

BusDiagram.propTypes = {
  typeBus: PropTypes.string.isRequired,
  setSelectedSeats: PropTypes.func.isRequired,
  selectedSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
  passengerCount: PropTypes.number,
};
