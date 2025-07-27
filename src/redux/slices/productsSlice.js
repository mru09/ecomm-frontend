// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async: Fetch all products (user view or seller view)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const role = thunkAPI.getState().auth.role;

  // const endpoint = role === 'seller' ? '/seller/products' : '/products';
  const endpoint = '/products';


  const res = await axios.get(`${API}${endpoint}`, {
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
        state.products = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearProductState } = productsSlice.actions;
export default productsSlice.reducer;
