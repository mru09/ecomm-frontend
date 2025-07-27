import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || '',
    role: role || '',
    isAuthenticated: !!token,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    logout: (state) => {
      state.token = '';
      state.role = '';
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
