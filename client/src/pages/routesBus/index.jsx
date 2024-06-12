import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SliderRoutes from '../../components/sliderRoutes';
import { fetchRoutes } from '../../api';

function RoutesBus() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4">
      <h2 className="font-semibold text-3xl my-8 text-center">Маршруты</h2>
      <SliderRoutes />
    </div>
  );
}

export default RoutesBus;
