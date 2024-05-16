import ListTicketsCard from '../../components/listTicketsCard';
import SearchTicketsForm from '../../components/ui/searchTicketsForm';

function Main() {
  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4">
      <h2 className="font-semibold text-xl">Поиск билетов</h2>
      <SearchTicketsForm />
      <ListTicketsCard />
    </div>
  );
}

export default Main;
