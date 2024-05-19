import { NavLink } from 'react-router-dom';

import BusDiagram from '../../components/busDiagram';
import FormBuyTicket from '../../components/formBuyTicket';

function DetailTicket() {
  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4 mt-10">
      <div className="flex justify-evenly">
        <ul className="relative flex flex-col gap-16">
          <li className="flex items-start gap-8">
            <div>
              <p className="font-semibold text-2xl">10:00</p>
              <span className="text-lg">16 мая 2024г.</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-textColor"></div>
            <p className="font-semibold text-2xl">Джалал-Абад</p>
          </li>
          <svg
            className="absolute left-[136.34px] top-[14px]"
            width="20"
            height="110"
            xmlns="http://www.w3.org/2000/svg">
            <line
              x1="10"
              y1="0"
              x2="10"
              y2="110"
              stroke="rgb(36, 176, 245)"
              strokeWidth="2"
              strokeDasharray="5"
            />
          </svg>

          <li className="flex items-start gap-8">
            <div>
              <p className="font-semibold text-2xl">20:00</p>
              <span className="text-lg">16 мая 2024г.</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-textColor"></div>
            <p className="font-semibold text-2xl">Бишкек</p>
          </li>
        </ul>
        <FormBuyTicket />
      </div>
      <div className="my-10 flex items-center flex-col gap-6">
        <h2 className="text-center font-semibold text-2xl">Выберите место на схеме автобуса</h2>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 rounded-lg bg-gray-200"></div>-
            <span className="text-base">свободно</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 rounded-lg bg-red-500"></div>-
            <span className="text-base">занято</span>
          </div>
        </div>
      </div>
      <BusDiagram />
      <div className="my-10 flex justify-end">
        <NavLink
          to="/payment"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Перейти к оплате
        </NavLink>
      </div>
    </div>
  );
}

export default DetailTicket;
