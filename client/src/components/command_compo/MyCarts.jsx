import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

// This would come from your cart context or Redux store in a real app
const cartItems = [
  { id: 1, name: 'Item 1', price: 19.99, image: '/path/to/image1.jpg' },
  { id: 2, name: 'Item 2', price: 29.99, image: '/path/to/image2.jpg' },
  // more items...
];

const CartPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container>
      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h4" component="h1">
          <ShoppingCart /> My Cart
        </Typography>
      </Box>

      {cartItems.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={isMobile ? 12 : 2}>
              <Avatar
                variant="rounded"
                src={item.image}
                sx={{ width: isMobile ? 80 : 120, height: isMobile ? 80 : 120 }}
              />
            </Grid>
            <Grid item xs={12} sm={isMobile ? 12 : 4}>
              <Typography variant="h6">{item.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={isMobile ? 12 : 6}>
              <Typography variant="body1">${item.price}</Typography>
            </Grid>
          </Grid>
          {!isMobile && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}

      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
