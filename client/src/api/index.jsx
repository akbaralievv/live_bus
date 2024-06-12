import { createAsyncThunk } from '@reduxjs/toolkit';

import { databases } from '../libs/appwrite';
import { Query } from 'appwrite';

const databaseId = import.meta.env.VITE_IDEAS_DATABASE_ID;
const collectionId = import.meta.env.VITE_IDEAS_COLLECTION_TICKETS_ID;

export const fetchTicketsAll = createAsyncThunk(
  'tickets/fetchTicketsAll',
  async (searchData, { rejectWithValue }) => {
    try {
      const queries = [];
      if (searchData) {
        if (searchData.fromCity) {
          queries.push(Query.contains('from', [searchData.fromCity]));
        }
        if (searchData.toCity) {
          queries.push(Query.contains('to', [searchData.toCity]));
        }
        if (searchData.date) {
          queries.push(Query.contains('fromDate', [searchData.date]));
        }
      }

      const response = await databases.listDocuments(databaseId, collectionId, queries);
      return response.documents;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const fetchOccupiedSeats = createAsyncThunk(
  'occupiedSeats/fetchOccupiedSeats',
  async (classType, { rejectWithValue }) => {
    try {
      const collectionId =
        classType === 'economy'
          ? 'seats_economy'
          : classType === 'comfort'
          ? 'seats_comfort'
          : classType === 'business'
          ? 'seats_business'
          : '';
      const response = await databases.listDocuments(databaseId, collectionId);
      return response.documents;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const fetchReservedSeats = createAsyncThunk(
  'reservedSeats/fetchReservedSeats',
  async (classType, { rejectWithValue }) => {
    try {
      const collectionId =
        classType === 'economy'
          ? 'seats_economy'
          : classType === 'comfort'
          ? 'seats_comfort'
          : classType === 'business'
          ? 'seats_business'
          : '';
      const response = await databases.listDocuments(databaseId, collectionId);
      const jsonString = response.documents[0].data.replace(/'/g, '"');
      const data = await JSON.parse(jsonString);
      return data;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const postReservedSeats = createAsyncThunk(
  'reservedSeats/postReservedSeats',
  async (classType, { rejectWithValue }) => {
    try {
      const collectionId =
        classType === 'economy'
          ? 'reserved_seats_economy'
          : classType === 'comfort'
          ? 'reserved_seats_comfort'
          : classType === 'business'
          ? 'reserved_seats_bussines'
          : '';
      const response = await databases.listDocuments(databaseId, collectionId);
      const jsonString = response.documents[0].data.replace(/'/g, '"');
      const data = await JSON.parse(jsonString);
      return data;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const fetchRoutes = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(databaseId, 'routes');
      return response.documents;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
