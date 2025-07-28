import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, status, totalPages } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ type: 'product', itemId: productId }));
  };
  
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Products</Typography>
      <Box display="flex" justifyContent='center' flexWrap="wrap" gap={2}>
        {products.map((product) => (
          <Card key={product._id} sx={{ width: 250 }}>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">₹{product.price}</Typography>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
