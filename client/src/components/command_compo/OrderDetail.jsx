import React from 'react';
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

const OrderDetailsPage = () => {
  const orderDetails = {
    orderNumber: '1234567890',
    date: '01/07/2023',
    total: '$100',
    products: [
      { name: 'Product 1', price: '$20', quantity: 2 },
      { name: 'Product 2', price: '$30', quantity: 3 },
    ],
  };

  return (
    <Container>
      <Box my={4}>

        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Order Number: {orderDetails.orderNumber}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Order Date: {orderDetails.date}
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
