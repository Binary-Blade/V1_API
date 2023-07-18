import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ResponsiveGrid() {
  const newFarmers = [
    {
      name: 'Ferme du Soleil Levant',
      description: 'Une description de la Ferme du Soleil Levant.',
      imagePath: 'https://images.unsplash.com/photo-1500770974080-d3bdfbae9994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', // ajoutez votre propre chemin d'image ici
    },
    {
      name: 'Ferme des Quatre Vents',
      description: 'Une description de la Ferme des Quatre Vents.',
      imagePath: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80', // ajoutez votre propre chemin d'image ici
    },
    {
      name: 'Ferme de la Vallée Verdoyante',
      description: 'Une description de la Ferme de la Vallée Verdoyante.',
      imagePath: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80', // ajoutez votre propre chemin d'image ici
    },
    {
      name: 'Ferme du Clair de Lune',
      description: 'Une description de la Ferme du Clair de Lune.',
      imagePath: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', // ajoutez votre propre chemin d'image ici
    },
  ];

  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        New Farmers This Week
      </Typography>
      <Grid container spacing={3}>
        {newFarmers.map((farmer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={farmer.imagePath}
                alt={farmer.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {farmer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {farmer.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" endIcon={<ArrowForwardIosIcon />}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
