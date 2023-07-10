import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
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

const FarmerPage = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/api_v1/farms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFarms(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFarms();
  }, []);

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        {farms &&
          farms.map((farm) => (
            <Grid item xs={12} sm={6} md={4} key={farm._id}>
              <StyledCard>
                <CardActionArea
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ImageBox
                    sx={{ backgroundImage: `url(${farm.farmImageCover})` }}
                  >
                    <LabelContainer>
                      {farm.label.map((label, index) => (
                        <Tooltip title={label} key={index}>
                          <LabelIcon color="primary" sx={{ mx: 0.5 }} />
                        </Tooltip>
                      ))}
                    </LabelContainer>
                    <Description>{farm.farmDescription}</Description>
                  </ImageBox>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {farm.farmName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <Button
                    component={Link}
                    to={`/farmers/${farm._id}/products`}
                    variant="contained"
                    color="primary"
                  >
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
