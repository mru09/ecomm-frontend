import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';
import { getRole, isLoggedIn } from '../../utils/auth';

const API = 'http://localhost:5000/api';

export default function ProductList({ addToCart: externalAddToCart }) {
  const [products, setProducts] = useState([]);
  const role = getRole();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch {
      alert('Failed to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (id) => {
    try {
      await axios.post(
        `${API}/cart/add`,
        { type: 'product', itemId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Product added to cart');
    } catch {
      alert('Failed to add to cart');
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} p={3}>
      {products.map((product) => (
        <Card key={product._id} sx={{ width: '250px', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ₹{product.price}
            </Typography>
          </CardContent>
          {role === 'user' && (
            <Box p={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </Button>
            </Box>
          )}
        </Card>
      ))}
    </Box>
  );
}
