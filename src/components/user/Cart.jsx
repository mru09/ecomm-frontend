import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  removeFromCart
} from '../../redux/slices/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (status === 'loading') return <Typography>Loading cart...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>

      {/* Products */}
      {items.products.length > 0 && (
        <>
          <Typography variant="h6">Products</Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
            {items.products.map((prod) => (
              <Card key={prod._id} sx={{ width: 250 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{prod.name}</Typography>
                    <IconButton onClick={() => dispatch(removeFromCart({ type: 'product', itemId: prod._id }))}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2">Qty: {prod.quantity}</Typography>
                  <Typography variant="body2">
                    ₹{prod.price} x {prod.quantity} = ₹
                    {(prod.price * prod.quantity).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Bundles */}
      {items.bundles.length > 0 && (
        <>
          <Typography variant="h6">Bundles</Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
            {items.bundles.map((bundle) =>
                <Card key={bundle._id} sx={{ width: 280 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{bundle.name}</Typography>
                      <IconButton onClick={() => dispatch(removeFromCart({ type: 'bundle', itemId: bundle._id }))}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2">
                      Qty: {bundle.quantity}
                    </Typography>
                    <Typography variant="body2">
                      ₹{bundle.price.toFixed(2)} x {bundle.quantity} = ₹
                      { bundle.total.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Total */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Total: ₹{total.toFixed(2)}
      </Typography>
    </Box>
  );
}
