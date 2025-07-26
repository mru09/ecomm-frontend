// src/components/user/Cart.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function Cart() {
  const [cart, setCart] = useState({ products: [], bundles: [] });

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCart(res.data || { products: [], bundles: [] });
    } catch {
      alert('Failed to fetch cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const productTotal = cart.products.reduce((sum, p) => sum + (p.price || 0), 0);
  const bundleTotal = cart.bundles.reduce((sum, b) => sum +  (b.price || 0), 0);
  const total = productTotal + bundleTotal;

  return (
    <Box display="flex" flexDirection="column" gap={3} p={3}>
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>

      {/* Products */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Products</Typography>
          {cart.products.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No products in cart.
            </Typography>
          ) : (
            <List dense>
              {cart.products.map((p) => (
                <ListItem key={p._id}>
                  <ListItemText primary={`${p.name} - Qty : ${p.quantity} - ₹${p.price}`} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Bundles */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1">Bundles</Typography>
          {cart.bundles.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No bundles in cart.
            </Typography>
          ) : (
            <List dense>
              {cart.bundles.map((b) => (
                <ListItem key={b._id}>
                  <ListItemText primary={`${b.name} - Qty : ${b.quantity} - ₹${b.price}`} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Grand Total */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Total Cart Price: ₹{total}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
