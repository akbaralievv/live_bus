import { createSlice } from '@reduxjs/toolkit';

import { fetchReservedSeats } from '../../api';

const initialState = {
  reservedSeatsData: [],
  reservedSeatsLoading: false,
  reservedSeatsError: false,
};

export const reservedSeatsSlice = createSlice({
  name: 'reservedSeats',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservedSeats.pending, (state) => {
        state.reservedSeatsLoading = true;
        state.reservedSeatsError = false;
        state.reservedSeatsData = [];
      })
      .addCase(fetchReservedSeats.fulfilled, (state, action) => {
        state.reservedSeatsData = action.payload;
        state.reservedSeatsLoading = false;
        state.reservedSeatsError = false;
      })
      .addCase(fetchReservedSeats.rejected, (state, action) => {
        state.reservedSeatsData = [];
        state.reservedSeatsLoading = false;
        state.reservedSeatsError = action.error.message;
      });
  },
});

export default reservedSeatsSlice.reducer;
