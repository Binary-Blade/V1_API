import React, { useState, useEffect, useContext } from 'react'; // Importer useContext
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
import { Helmet } from 'react-helmet'; // Importer Helmet
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AuthContext } from '../../context/authContext'; // Importer AuthContext

const LabelIcon = {
  'Euro-Leaf': <FastfoodIcon />,
  Organic: <LocalPizzaIcon />,
  'EU-Red Label': <FastfoodIcon />,
  PGI: <LocalPizzaIcon />,
};

const ProductPage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);

  const { authToken } = useContext(AuthContext); // Obtenir le token depuis le contexte

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api_v1/cart`,
        {
          product: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Utiliser le token depuis le contexte
          },
        }
      );

      setCartCount((prevCount) => prevCount + 1);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api_v1/products`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Utiliser le token depuis le contexte
        },
      });

      return res.data.data;
    } catch (err) {
      console.error(err);
      return []; // return empty array in case of error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <Container>
       <Helmet>
            <title>Nos produits - AgriFlow</title>
            <meta name="description" content="Découvrez nos produits sur AgriFlow." />
        </Helmet>
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
                      onClick={() => handleAddToCart(product._id)}
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
