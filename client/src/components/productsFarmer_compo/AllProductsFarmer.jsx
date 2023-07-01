import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: '55%',
  '@media (min-width:600px)': {
    paddingBottom: '60%',
  },
  '@media (min-width:960px)': {
    paddingBottom: '75%',
  },
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#fafafa',
  borderRadius: '10px 10px 0 0',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform .3s',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderRadius: theme.spacing(1),
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    imagePath: '/path-to-your-image-1.png',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    imagePath: '/path-to-your-image-2.png',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description 3',
    imagePath: '/path-to-your-image-3.png',
  },
  // Add more products here...
];

const ProductPage = () => {
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <StyledCard>
              <CardActionArea
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
              >
                <ImageBox
                  sx={{ backgroundImage: `url(${product.imagePath})` }}
                />
                <Description>{product.description}</Description>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ p: 2 }}>
                <Button
                  startIcon={<ShoppingCartIcon />}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Purchase
                </Button>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductPage;
