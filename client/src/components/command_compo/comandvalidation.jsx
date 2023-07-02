import React from "react";
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderConfirmationPage = () => {
  return (
    <Container>
      <Box my={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Order Confirmation
        </Typography>
        <CheckCircleOutlineIcon style={{ fontSize: 100, color: '#4caf50' }} />
        <Typography variant="h5" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="subtitle1">
          Your order has been confirmed and your receipt has been sent to your email. 
        </Typography>
        <Typography variant="subtitle1">
          You will receive another email when your order has been shipped.
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column">
          <Grid item xs={12}>
            <Box mt={4}>
              <Button component={Link} to="/orderdetails" variant="contained" color="primary" size="large" >
                View Order Details
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button component={Link} to="/products" variant="contained" color="secondary" size="large">
                Continue Shopping
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderConfirmationPage;
