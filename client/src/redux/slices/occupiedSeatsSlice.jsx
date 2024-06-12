import { createSlice } from '@reduxjs/toolkit';

import { fetchOccupiedSeats } from '../../api';

const initialState = {
  occupiedSeatsData: [],
  occupiedSeatsLoading: false,
  occupiedSeatsError: false,
};

export const occupiedSeatsSlice = createSlice({
  name: 'occupiedSeats',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccupiedSeats.pending, (state) => {
        state.occupiedSeatsLoading = true;
        state.occupiedSeatsError = false;
        state.occupiedSeatsData = [];
      })
      .addCase(fetchOccupiedSeats.fulfilled, (state, action) => {
        state.occupiedSeatsData = action.payload;
        state.occupiedSeatsLoading = false;
        state.occupiedSeatsError = false;
      })
      .addCase(fetchOccupiedSeats.rejected, (state, action) => {
        state.occupiedSeatsData = [];
        state.occupiedSeatsLoading = false;
        state.occupiedSeatsError = action.error.message;
      });
  },
});

export default occupiedSeatsSlice.reducer;
