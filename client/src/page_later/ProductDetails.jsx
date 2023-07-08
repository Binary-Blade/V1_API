import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import Rating from '@mui/material/Rating';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api_v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération du produit.",
          error
        );
      });
  }, [id]);

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.imageUrl}
                alt={product.name}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h5">{product.price}</Typography>

            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>

            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </Grid>
        </Grid>

        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>

          <List>
            {product.reviews.map((review) => (
              <ListItem key={review.id}>
                <Avatar>{review.reviewer[0]}</Avatar>
                <ListItemText
                  primary={review.reviewer}
                  secondary={review.text}
                />
                <Rating value={review.rating} readOnly />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;
