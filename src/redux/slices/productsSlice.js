// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

// Async: Fetch all products (user view or seller view)
export const fetchProducts = createAsyncThunk('products/fetchProducts', 
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const endpoint = '/api/products';

  const res = await axios.get(`${API}${endpoint}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,

  },
  reducers: {
    clearProductState: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearProductState } = productsSlice.actions;
export default productsSlice.reducer;
