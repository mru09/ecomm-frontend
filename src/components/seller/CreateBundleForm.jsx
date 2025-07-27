import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Checkbox,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productsSlice';
import { createBundle, fetchBundles } from '../../redux/slices/bundlesSlice';

export default function CreateBundleForm() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [selected, setSelected] = useState([]);
  const [bundleName, setBundleName] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleCreateBundle = () => {
    if (selected.length < 2) {
      alert('A bundle must have at least 2 products');
      return;
    }

    dispatch(createBundle({ name: bundleName || 'New Bundle', productIds: selected }))
      .then(() => {
        dispatch(fetchBundles());
        setSelected([]);
        setBundleName('');
      });
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Create a New Bundle</Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        <TextField
        label="Bundle Name"
        sx={{ my: 2, flexGrow: 1, minWidth: 200}}
        value={bundleName}
        onChange={(e) => setBundleName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ my: 2 }}

          onClick={handleCreateBundle}
        >
          Create Bundle
        </Button>
      </Box>
      
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {products.map((product) => (
          <Card key={product._id} sx={{ width: 250 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">{product.name}</Typography>
                <Checkbox
                  checked={selected.includes(product._id)}
                  onChange={() => toggleSelect(product._id)}
                />
              </Box>
              <Typography variant="body2">₹{product.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

     
    </Box>
  );
}
