import bus from '../../assets/icons/bus.png';

function TicketCard() {
  return (
    <div className="flex w-full items-center justify-between flex-wrap gap-10 rounded-2xl shadow p-4 bg-customWhite dark:bg-gray-800">
      <div className="flex gap-20 justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg">10:00</h3>
          <p className="font-semibold text-base">Джалал-Абад</p>
          <span className="text-textColor text-base">16 мая 2024г.</span>
        </div>
        <div className="border-b border-black pb-2 w-60 flex justify-center">
          <img src={bus} alt="bus" className="w-8" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg">20:00</h3>
          <p className="font-semibold text-base">Бишкек</p>
          <span className="text-textColor text-base">16 мая 2024г.</span>
        </div>
      </div>
      <p className="text-color text-lg">10 часов в пути</p>
      <button className="flex flex-col items-center justify-center gap-1 h-16 w-full 487:w-52 flex items-center justify-center bg-white rounded-2xl">
        Купить билет
        <span>1000 сом</span>
      </button>
    </div>
  );
}

export default TicketCard;
