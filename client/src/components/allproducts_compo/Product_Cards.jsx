import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  Badge,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getProducts } from '../../api/ApiProducts';
import { styled } from '@mui/system';

const LabelIcon = {
  'Euro-Leaf': <FastfoodIcon />,
  Organic: <LocalPizzaIcon />,
  'EU-Red Label': <FastfoodIcon />,
  PGI: <LocalPizzaIcon />,
};

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  marginRight: theme.spacing(1),
}));

const ProductPage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Our Products
          </Typography>
          <Button component={Link} to="/cards" color="inherit">
            Mon Panier
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.photo}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {product.pricePerKg.toFixed(2)}€/Kg
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {product.label.map((label) => (
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
                      onClick={handleAddToCart}
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
