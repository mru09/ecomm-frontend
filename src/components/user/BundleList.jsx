import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBundles } from '../../redux/slices/bundlesSlice';
import { addToCart } from '../../redux/slices/cartSlice';

export default function BundleList() {
  const dispatch = useDispatch();
  const { bundles, status } = useSelector((state) => state.bundles);

  useEffect(() => {
    dispatch(fetchBundles());
  }, [dispatch]);

  const handleAddToCart = (bundleId) => {
    dispatch(addToCart({ type: 'bundle', itemId: bundleId }));
  };
  
  if (status === 'loading') return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Bundles</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
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
    </Box>
  );
}
