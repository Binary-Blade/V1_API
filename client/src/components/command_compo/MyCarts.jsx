import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import Checkout from './Checkout'; // import the Checkout component

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null); // Add this line to create a new state for the cart id
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:8000/api_v1/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(res.data.data.cart.products);
        setCartId(res.data.data.cart._id);
        // Set the total cost of the cart here
        setTotalCost(res.data.data.cart.totalCost);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted item from the cartItems state
      setCartItems(cartItems.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <List>
              {cartItems.map((item, index) => (
                <ListItem key={`${item.product._id}-${index}`}>
                  <ListItemText
                    primary={item.product.name}
                    secondary={`Price per kg: $${
                      item.product.pricePerKg
                    }, Quantity: ${item.quantity}, Total: $${(
                      item.product.pricePerKg * item.quantity
                    ).toFixed(2)}`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteItem(item.product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* Pass productId as prop to Checkout component */}
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Total: ${totalCost.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Checkout cartId={cartId} />
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
