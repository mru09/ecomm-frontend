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
import { fetchBundles } from '../../redux/slices/bundlesSlice';
import { addToCart } from '../../redux/slices/cartSlice';

export default function BundleList() {
  const dispatch = useDispatch();
  const { bundles, status, totalPages, currentPage } = useSelector((state) => state.bundles);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBundles({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleAddToCart = (bundleId) => {
    dispatch(addToCart({ type: 'bundle', itemId: bundleId }));
  };
  
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Bundles</Typography>
      <Box display="flex" justifyContent='center' flexWrap="wrap" gap={2}>
        {bundles.map((bundle) => (
          <Card key={bundle._id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h6">{bundle.name}</Typography>
              <Typography variant="body2" gutterBottom>
                {bundle.products.length} products
              </Typography>
              <Typography variant="body2">
                ₹{bundle.discountedPrice.toFixed(2)} 
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => handleAddToCart(bundle._id)}
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
