import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const OrderDetailsPage = (props) => {
  // Assuming orderId and sessionId are passed as props
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    session_id: null,
    ...otherFields,
  });
  useEffect(() => {
    const { orderId, sessionId } = props; // Destructure orderId and sessionId from props

    const url = `api_v1/cart/orderDetails/${orderId}?session_id=${sessionId}`;

    axios
      .get(url)
      .then((response) => setOrderDetails(response.data))
      .catch((error) => console.error('Error:', error));
  }, []); // Empty dependency array to run only on component mount

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Order ID: {orderDetails.orderId}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Session ID: {orderDetails.session_id}
        </Typography>

        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableBody>
              {orderDetails.products.map((product, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{product.name}</StyledTableCell>
                  <StyledTableCell>{product.price}</StyledTableCell>
                  <StyledTableCell>{product.quantity}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid
          container
          spacing={3}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={12} sm={3}>
            <Box mt={4}>
              <Typography variant="h6" color="primary">
                Total: {orderDetails.total}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderDetailsPage;
