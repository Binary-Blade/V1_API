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
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LabelIcon from '@mui/icons-material/Label';

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

const LabelContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'flex',
  flexDirection: 'row',
}));

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
  // You can add more farms here...
];

const FarmerPage = () => {
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {farmers.map((farmer) => (
          <Grid item xs={12} sm={6} md={4} key={farmer.id}>
            <StyledCard>
              <CardActionArea
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
              >
                <ImageBox sx={{ backgroundImage: `url(${farmer.imagePath})` }}>
                  <LabelContainer>
                    {farmer.labels.map((label, index) => (
                      <Tooltip title={label} key={index}>
                        <LabelIcon color="primary" sx={{ mx: 0.5 }} />
                      </Tooltip>
                    ))}
                  </LabelContainer>
                  <Description>{farmer.description}</Description>
                </ImageBox>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {farmer.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box
                sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 2 }}
              >
                <Button variant="contained" color="primary">
                  View Products
                </Button>
                <Button variant="contained" color="secondary">
                  View Farm
                </Button>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FarmerPage;
