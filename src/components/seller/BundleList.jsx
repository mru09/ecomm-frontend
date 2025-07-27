import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBundles,
  deleteBundle,
} from '../../redux/slices/bundlesSlice';

export default function SellerBundleList() {
  const dispatch = useDispatch();
  const { bundles, status } = useSelector((state) => state.bundles);

  useEffect(() => {
    dispatch(fetchBundles());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this bundle?')) {
      dispatch(deleteBundle(id));
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Existing Bundles</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {bundles.map((bundle) => (
          <Card key={bundle._id} sx={{ width: 300 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{bundle.name}</Typography>
                <IconButton onClick={() => handleDelete(bundle._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography variant="body2">
                {bundle.products.length} products
              </Typography>
              <Typography variant="body2">
                ₹
                {bundle.discountedPrice.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
