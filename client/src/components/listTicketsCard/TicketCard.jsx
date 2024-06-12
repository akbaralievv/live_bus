import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';
import { differenceInHours } from 'date-fns';
import { ru } from 'date-fns/locale';

import bus from '../../assets/icons/bus.png';

function TicketCard({ data }) {
  function calculateTimeDifference(startDate, startTime, endDate, endTime) {
    const start = parse(`${startDate} ${startTime}`, 'd MMMM yyyyг. HH:mm', new Date(), {
      locale: ru,
    });
    const end = parse(`${endDate} ${endTime}`, 'd MMMM yyyyг. HH:mm', new Date(), { locale: ru });

    const result = differenceInHours(end, start);

    return result;
  }

  const typeBus =
    data.typeBus === 'economy'
      ? 'Эконом класс'
      : data.typeBus === 'comfort'
      ? 'Комфорт класс'
      : data.typeBus === 'business'
      ? 'Бизнес класс'
      : '';

  return (
    <div className="flex w-full items-center justify-between flex-wrap gap-10 rounded-2xl shadow p-4 bg-customWhite dark:bg-gray-800">
      <div className="flex gap-20 justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg">{data.fromTime}</h3>
          <p className="font-semibold text-base">{data.from}</p>
          <span className="text-textColor text-base">{data.fromDate}</span>
        </div>
        <div>
          <div className="border-b border-black pb-2 w-60 flex justify-center">
            <img src={bus} alt="bus" className="w-8" />
          </div>
          {data.typeBus && <p className="text-center mt-2 font-medium">{typeBus}</p>}
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg">{data.toTime}</h3>
          <p className="font-semibold text-base">{data.to}</p>
          <span className="text-textColor text-base">{data.toDate}</span>
        </div>
      </div>
      <p className="text-color text-lg">{`${calculateTimeDifference(
        data.fromDate,
        data.fromTime,
        data.toDate,
        data.toTime,
      )} часов в пути`}</p>
      <NavLink
        to="/detailTicket"
        state={{ state: data }}
        className="flex flex-col items-center justify-center gap-1 h-16 w-full 487:w-52 bg-white rounded-2xl">
        Купить билет
        <span>{data.price}</span>
      </NavLink>
    </div>
  );
}

export default TicketCard;

TicketCard.propTypes = {
  data: PropTypes.object,
};
