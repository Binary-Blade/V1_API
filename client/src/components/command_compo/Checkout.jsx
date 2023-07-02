import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CheckoutPage = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Shipping Details
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="City"
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Zip / Postal code"
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Country"
                variant="outlined"
              />
            </form>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Your Order
            </Typography>
            <Box sx={{ border: '1px solid grey', p: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body1">Product 1</Typography>
                <Typography variant="body1">$19.99</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body1">Product 2</Typography>
                <Typography variant="body1">$29.99</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">$49.98</Typography>
              </Box>
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                component={Link}
                to="/payment"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
              >
                Proceed to Payment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mb={4}>
        <Button component={Link} to="/cards" startIcon={<ArrowBackIcon />}>
          Back to My Orders
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
