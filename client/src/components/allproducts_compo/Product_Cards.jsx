import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    imagePath: '/path-to-your-image-1.png',
    price: '$29.99',
    category: 'Viande',
    farmer: {
      name: 'Farm 1',
      avatarPath: '/path-to-farmer-avatar-1.png',
    },
    labels: ['Bio', 'Vegan'],
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    imagePath: '/path-to-your-image-2.png',
    price: '$19.99',
    category: 'Légumes',
    farmer: {
      name: 'Farm 2',
      avatarPath: '/path-to-farmer-avatar-2.png',
    },
    labels: ['Sans Gluten'],
  },
  // Add more products here...
];
const LabelIcon = {
  Vegan: <FastfoodIcon />,
  'Sans Gluten': <LocalPizzaIcon />,
};

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  marginRight: theme.spacing(1),
}));

const ProductPage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imagePath}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <CustomAvatar
                        src={product.farmer.avatarPath}
                        alt={product.farmer.name}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {product.farmer.name}
                      </Typography>
                    </Box>
                    <Typography variant="h6">{product.price}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {product.description}
                  </Typography>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {product.labels.map((label) => (
                      <Chip
                        icon={LabelIcon[label]}
                        label={label}
                        variant="outlined"
                        sx={{ mr: 1, mt: 1 }}
                        key={label}
                      />
                    ))}
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      startIcon={<ShoppingCartIcon />}
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductPage;
