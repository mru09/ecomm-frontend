// src/components/seller/CreateBundleForm.jsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function CreateBundleForm() {
  const [bundleName, setBundleName] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setProducts(res.data));
  }, []);

  const handleCheckbox = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!bundleName || selectedProducts.length === 0) {
      alert('Enter bundle name and select at least one product.');
      return;
    }

    try {
      await axios.post(
        `${API}/bundles`,
        { name: bundleName, productIds: selectedProducts },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Bundle created successfully');
      setBundleName('');
      setSelectedProducts([]);
    } catch (err) {
      alert('Failed to create bundle');
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create a New Bundle
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Bundle Name"
          value={bundleName}
          onChange={(e) => setBundleName(e.target.value)}
          fullWidth
        />
        <Typography variant="subtitle1">Select Products:</Typography>
        <Box display="flex" flexDirection="column" maxHeight={300} overflow="auto">
          {products.map((product) => (
            <FormControlLabel
              key={product._id}
              control={
                <Checkbox
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => handleCheckbox(product._id)}
                />
              }
              label={`${product.name} - ₹${product.price}`}
            />
          ))}
        </Box>
        <Button variant="contained" onClick={handleCreate}>
          Create Bundle
        </Button>
      </Box>
    </Paper>
  );
}
