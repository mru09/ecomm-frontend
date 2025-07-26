// src/utils/auth.js

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login';
};
