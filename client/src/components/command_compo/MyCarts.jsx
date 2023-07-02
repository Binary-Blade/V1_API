import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: '$20', quantity: 2 },
    { id: 2, name: 'Product 2', price: '$30', quantity: 1 },
    { id: 3, name: 'Product 3', price: '$40', quantity: 3 },
  ];

  const totalAmount = cartItems.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: ${item.price}, Quantity: ${item.quantity}`}
                  />
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Total: ${totalAmount.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to="/checkout"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box mb={4}>
        <Button component={Link} to="/products" startIcon={<ArrowBackIcon />}>
          Back to products
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
