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
      imagePath: 'imgPath1.png', // ajoutez votre propre chemin d'image ici
    },
    {
      name: 'Ferme des Quatre Vents',
      description: 'Une description de la Ferme des Quatre Vents.',
      imagePath: 'imgPath2.png', // ajoutez votre propre chemin d'image ici
    },
    {
      name: 'Ferme de la Vallée Verdoyante',
      description: 'Une description de la Ferme de la Vallée Verdoyante.',
      imagePath: 'imgPath3.png', // ajoutez votre propre chemin d'image ici
    },
    {
      name: 'Ferme du Clair de Lune',
      description: 'Une description de la Ferme du Clair de Lune.',
      imagePath: 'imgPath4.png', // ajoutez votre propre chemin d'image ici
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
