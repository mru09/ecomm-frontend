// src/components/seller/BundleList.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function BundleList() {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/bundles`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setBundles(res.data))
      .catch(() => alert('Failed to load bundles'));
  }, []);

 return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Existing Bundles
      </Typography>

       {bundles.length === 0 ? (
        <Typography>No bundles created yet.</Typography>
      ) : (
        bundles.map((bundle) => (
          <Paper key={bundle._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">{bundle.name}</Typography>
            <List dense>
              {bundle.products.map((product) => (
                <ListItem key={product._id}>
                  <ListItemText primary={`${product.name} - ₹${product.price}`} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" fontWeight="bold">
              Total Price: ₹{bundle.discountedPrice}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}
