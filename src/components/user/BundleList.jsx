// src/components/user/BundleList.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function BundleList() {
  const [bundles, setBundles] = useState([]);

  const fetchBundles = async () => {
    try {
      const res = await axios.get(`${API}/bundles`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBundles(res.data);
    } catch {
      alert('Failed to load bundles');
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  const addToCart = async (bundleId) => {
    try {
      await axios.post(
        `${API}/cart/add`,
        { type: 'bundle', itemId: bundleId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Bundle added to cart');
    } catch {
      alert('Failed to add bundle');
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} p={3}>
      {bundles.map((bundle) => (
        <Card key={bundle._id} sx={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h6">{bundle.name}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" gutterBottom>Includes:</Typography>
            <List dense>
              {bundle.products.map((p) => (
                <ListItem key={p._id}>
                  <ListItemText primary={`${p.name} - ₹${p.price}`} />
                </ListItem>
              ))}
            </List>
            <Typography fontWeight="bold" mt={1}>
              Total: ₹{bundle.discountedPrice}
            </Typography>
          </CardContent>
          <Box p={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => addToCart(bundle._id)}
            >
              Add to Cart
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
