import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
  const token = getState().auth.token;
  const res = await axios.get(`${API_BASE}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ type, itemId }, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.post(
    `${API_BASE}/cart/add`,
    { type, itemId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ type, itemId }, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.post(
      `${API_BASE}/cart/remove`,
      { type, itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

export const removeAndRefreshCart = createAsyncThunk(
  'cart/removeAndRefresh',
  async ({ type, itemId }, { dispatch }) => {
    await dispatch(removeFromCart({ type, itemId }));
    await dispatch(fetchCart());
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {
      products: [],
      bundles: [],
    },
    total: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = {
          products: action.payload.products || [],
          bundles: action.payload.bundles || [],
        };
        state.total = action.payload.total || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default cartSlice.reducer;
