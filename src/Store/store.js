// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './TabSlice/tabListSlice';

export const store = configureStore({
  reducer: {
    tabs: tabReducer, // add more reducers here
  },
});
