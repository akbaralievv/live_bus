import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ListTicketsCard from '../../components/listTicketsCard';
import SearchTicketsForm from '../../components/ui/searchTicketsForm';
import { fetchTicketsAll } from '../../api';

function Tickets() {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(fetchTicketsAll());
  }, [dispacth]);

  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4">
      <h2 className="font-semibold text-3xl my-8">Поиск билетов</h2>
      <SearchTicketsForm />
      <ListTicketsCard />
    </div>
  );
}

export default Tickets;
