import { useSelector } from 'react-redux';
import { parse, isBefore } from 'date-fns';
import { ru } from 'date-fns/locale';

import TicketCard from './TicketCard';

function ListTicketsCard() {
  const { ticketsData, ticketsLoading, ticketsError } = useSelector((state) => state.ticketsSlice);

  const isTicketValid = (ticket) => {
    const now = new Date();
    const fromDateTime = parse(
      `${ticket.fromDate} ${ticket.fromTime}`,
      'd MMMM yyyyг. HH:mm',
      new Date(),
      { locale: ru },
    );
    const toDateTime = parse(
      `${ticket.toDate} ${ticket.toTime}`,
      'd MMMM yyyyг. HH:mm',
      new Date(),
      { locale: ru },
    );

    return !isBefore(toDateTime, now) || !isBefore(fromDateTime, now);
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {ticketsLoading ? (
        <h3>Загрузка...</h3>
      ) : ticketsError ? (
        <h3>Пусто</h3>
      ) : (
        ticketsData
          ?.filter(isTicketValid)
          .map((ticket) => <TicketCard key={ticket.$id} data={ticket} />)
      )}
    </div>
  );
}

export default ListTicketsCard;
