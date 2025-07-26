import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchBundles = createAsyncThunk('bundles/fetchBundles', async () => {
  const response = await axios.get(`${API_BASE}/bundles`);
  return response.data;
});

export const createBundle = createAsyncThunk('bundles/createBundle', async (bundleData, { getState }) => {
  const token = getState().bundles.token;
  const response = await axios.post(`${API_BASE}/bundles`, bundleData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState: { bundles: [], status: 'idle', error: null, token: '' },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBundles.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchBundles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bundles = action.payload;
      })
      .addCase(fetchBundles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        state.bundles.push(action.payload);
      });
  }
});

export const { setToken } = bundlesSlice.actions;
export default bundlesSlice.reducer;
