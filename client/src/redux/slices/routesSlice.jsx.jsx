import { createSlice } from '@reduxjs/toolkit';

import { fetchRoutes } from '../../api';

const initialState = {
  routesData: [],
  routesLoading: false,
  routesError: false,
};

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.routesLoading = true;
        state.routesError = false;
        state.routesData = [];
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.routesData = action.payload;
        state.routesLoading = false;
        state.routesError = false;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.routesData = [];
        state.routesLoading = false;
        state.routesError = action.error.message;
      });
  },
});

export default routesSlice.reducer;
