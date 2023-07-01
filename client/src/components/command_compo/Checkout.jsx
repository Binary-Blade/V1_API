import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';

const ImageBox = styled(Box)({
  width: '100%',
  height: 0,
  paddingBottom: '50%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#fafafa', // Remplacez ceci par la couleur de votre choix
  border: '1px solid #ccc', // Vous pouvez personnaliser la bordure ici
});

const farmers = [
  {
    id: 1,
    name: 'Farm 1',
    location: 'Location 1',
    description: 'Description 1',
    labels: ['Label Rouge', 'Bio'],
    imagePath: '/path-to-your-image-1.png',
  },
  {
    id: 2,
    name: 'Farm 2',
    location: 'Location 2',
    description: 'Description 2',
    labels: ['Label Rouge'],
    imagePath: '/path-to-your-image-2.png',
  },
  {
    id: 3,
    name: 'Farm 3',
    location: 'Location 3',
    description: 'Description 3',
    labels: ['Bio'],
    imagePath: '/path-to-your-image-3.png',
  },
  {
    id: 3,
    name: 'Farm 3',
    location: 'Location 3',
    description: 'Description 3',
    labels: ['Bio'],
    imagePath: '/path-to-your-image-3.png',
  },
  // You can add more farms here...
];

const FarmerPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {farmers.map((farmer) => (
          <Grid item xs={12} md={6} key={farmer.id}>
            <Box sx={{ textAlign: 'center' }}>
              <ImageBox />
              <Typography variant="h5">{farmer.name}</Typography>
              <Typography variant="subtitle1">{farmer.location}</Typography>
              {matches && (
                <>
                  <Typography variant="body1">{farmer.description}</Typography>
                  <Typography variant="body1">
                    {farmer.labels.join(', ')}
                  </Typography>
                </>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button variant="contained" color="primary">
                  View Products
                </Button>
                <Button variant="contained" color="secondary">
                  View Farm
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FarmerPage;
