import TicketCard from './TicketCard';

function ListTicketsCard() {
  const cards = [...new Array(6)].map((_, index) => <TicketCard key={index} />);
  return <div className="mt-8 flex flex-col items-center gap-4">{cards}</div>;
}

export default ListTicketsCard;
