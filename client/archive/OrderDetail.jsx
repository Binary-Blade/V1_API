import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function OrderDetail() {
  const [order, setOrder] = useState(null);
  let query = useQuery();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const sessionId = query.get('session_id');
        const response = await axios.get(
          `http://127.0.0.1:8000/api_v1/payment/success?session_id=${sessionId}`
        );
        setOrder(response.data.data.order);
      } catch (error) {
        console.error('Error fetching order details', error);
        // handle error
      }
    };
    fetchOrderDetails();
  }, []);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Typography variant="h4">Order Details</Typography>
      <Box mb={2}>
        <Typography variant="h5">Buyer ID: {order.buyer}</Typography>
        <Typography variant="h6">Total Price: ${order.totalPrice}</Typography>
      </Box>
      <Typography variant="h6">Products:</Typography>
      <List>
        {order.products.map((product) => (
          <ListItem key={product._id}>
            <ListItemText
              primary={`Product ID: ${product.product}`}
              secondary={`Quantity: ${product.quantity}, Price: $${product.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default OrderDetail;
