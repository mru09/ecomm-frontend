// src/redux/slices/bundlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

// Async: Fetch bundles (seller or user)
export const fetchBundles = createAsyncThunk(
  'bundles/fetchBundles',
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const endpoint = '/api/bundles';

    const res = await axios.get(`${API}${endpoint}?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; // Expected: { bundles, totalPages, currentPage }
  }
);

// Async: Create new bundle (seller only)
export const createBundle = createAsyncThunk('bundles/createBundle', async (bundleData, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  const res = await axios.post(`${API}/api/bundles`, bundleData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
});

// Async: Delete a bundle (seller only)
export const deleteBundle = createAsyncThunk('bundles/deleteBundle', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  await axios.delete(`${API}/api/bundles/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return id;
});

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState: {
    bundles: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearBundleState: (state) => {
      state.bundles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBundles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBundles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bundles = action.payload.bundles;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBundles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        state.bundles.push(action.payload);
      })
      .addCase(deleteBundle.fulfilled, (state, action) => {
        state.bundles = state.bundles.filter((b) => b._id !== action.payload);
      });
  },
});

export const { clearBundleState } = bundlesSlice.actions;
export default bundlesSlice.reducer;
