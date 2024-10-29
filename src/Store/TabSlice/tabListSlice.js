// src/features/counter/tabSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk to fetch data from the API
export const getTabContent = createAsyncThunk(
  'tabs/getTabContent',
  async () => {
    const response = await axios.get('https://loripsum.net/api/10/short/headers');
    // Return the data, which will be available as `action.payload` in the reducer
    return response.data;
  }
);

export const tabSlice = createSlice({
  name: 'tabs',
  initialState: {
    value: 0,
    content: '', // to store the fetched data
    status: 'idle', // status for loading states
    error: null,    // to store errors
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTabContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTabContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the fetched content to the state
        state.content = action.payload;
      })
      .addCase(getTabContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the action creators for incrementing/decrementing
export const { increment, decrement, incrementByAmount } = tabSlice.actions;


// Export the reducer to be added to the store
export default tabSlice.reducer;
