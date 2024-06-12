import { configureStore } from '@reduxjs/toolkit';

import ticketsSlice from './slices/ticketsSlice';
import occupiedSeatsSlice from './slices/occupiedSeatsSlice';
import reservedSeatsSlice from './slices/reservedSeatsSlice';
import routesSlice from './slices/routesSlice.jsx';

export const store = configureStore({
  reducer: {
    ticketsSlice,
    occupiedSeatsSlice,
    reservedSeatsSlice,
    routesSlice,
  },
});
