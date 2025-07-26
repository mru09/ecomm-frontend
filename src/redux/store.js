import { configureStore } from '@reduxjs/toolkit';
import bundlesReducer from './bundlesSlice';

export const store = configureStore({
  reducer: {
    bundles: bundlesReducer,
  },
});