import { createSlice } from '@reduxjs/toolkit';

import { fetchTicketsAll } from '../../api';

const initialState = {
  ticketsData: [],
  ticketsLoading: false,
  ticketsError: false,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsAll.pending, (state) => {
        state.ticketsLoading = true;
        state.ticketsError = false;
        state.ticketsData = [];
      })
      .addCase(fetchTicketsAll.fulfilled, (state, action) => {
        state.ticketsData = action.payload;
        state.ticketsLoading = false;
        state.ticketsError = false;
      })
      .addCase(fetchTicketsAll.rejected, (state, action) => {
        state.ticketsData = [];
        state.ticketsLoading = false;
        state.ticketsError = action.error.message;
      });
  },
});

export default ticketsSlice.reducer;
