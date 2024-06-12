import { useLocation, useNavigate } from 'react-router-dom';

export default function DetailRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.state;

  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4 mt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="text-xl font-bold tracking-tight sm:text-lg mb-8">
          {`< Назад`}
        </button>
        <div className="mx-auto max-w-5xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight  sm:text-3xl">{data.name}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-500">{data.description}</p>
        </div>
        <div className="mx-auto mt-10">
          <h3 className="text-3xl font-bold tracking-tight sm:text-2xl mb-4">Остановки</h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7  sm:grid-cols-2 md:flex lg:gap-x-10">
            {data.stops
              ? JSON.parse(data.stops)?.map((link) => (
                  <button key={link}>
                    {link} <span aria-hidden="true">&rarr;</span>
                  </button>
                ))
              : 'Остановок нет'}
          </div>
        </div>
      </div>
    </div>
  );
}
