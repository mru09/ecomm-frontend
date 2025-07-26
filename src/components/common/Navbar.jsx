// src/components/common/Navbar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRole, isLoggedIn, logout } from '../../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const role = getRole();

  const handleNav = (path) => () => navigate(path);

  const renderTabs = () => {
    if (!loggedIn) {
      return (
        <>
          <Button color="inherit" onClick={handleNav('/login')}>Login</Button>
          <Button color="inherit" onClick={handleNav('/register')}>Register</Button>
        </>
      );
    }

    if (role === 'seller') {
      return (
        <>
          <Button color="inherit" onClick={handleNav('/seller/products')}>Products</Button>
          <Button color="inherit" onClick={handleNav('/seller/bundles')}>Bundles</Button>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </>
      );
    }

    if (role === 'user') {
      return (
        <>
          <Button color="inherit" onClick={handleNav('/user/products')}>Products</Button>
          <Button color="inherit" onClick={handleNav('/user/bundles')}>Bundles</Button>
          <Button color="inherit" onClick={handleNav('/cart')}>Cart</Button>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </>
      );
    }

    return null;
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          onClick={handleNav('/')}
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          EcommApp
        </Typography>
        <Box display="flex" gap={2}>
          {renderTabs()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
