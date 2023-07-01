import * as React from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function OrderConfirmationPage() {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Order Confirmation
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Thank you for your order!
        </Typography>
        <Typography>
          We've received your order and will begin processing it soon. Your
          order details are below.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Delivery Address
        </Typography>
        <Typography>
          John Doe
          <br />
          123 Main St.
          <br />
          City, State, Postal Code
          <br />
          Country
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List>
          {/* Repeat ListItem for each item in the order */}
          <ListItem>
            <ListItemText primary="Product 1" secondary="Quantity: 1" />
            <Typography variant="body2">$49.99</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Product 2" secondary="Quantity: 2" />
            <Typography variant="body2">$89.98</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1">$139.97</Typography>
          </ListItem>
        </List>
      </Box>

      <Box mt={4}>
        <Typography>
          Your order will be shipped to the address you provided within 2-3
          business days. You will receive a confirmation email with tracking
          information once your order has shipped.
        </Typography>
      </Box>
    </Container>
  );
}
