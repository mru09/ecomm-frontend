// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductList from './components/user/ProductList';
import BundleList from './components/user/BundleList';
import Cart from './components/user/Cart';
import CreateBundleForm from './components/seller/CreateBundleForm';
import SellerBundleList from './components/seller/BundleList';
import PrivateRoute from './components/common/PrivateRoute';
import { useSelector } from 'react-redux';

export default function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? `/${role}/products` : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
        <Route
          path="/user/products"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/bundles"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <BundleList />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Seller routes */}
        <Route
          path="/seller/products"
          element={
            <PrivateRoute allowedRoles={['seller']}>
              <CreateBundleForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/bundles"
          element={
            <PrivateRoute allowedRoles={['seller']}>
              <SellerBundleList />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
