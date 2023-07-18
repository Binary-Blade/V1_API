import React from 'react';
import ButtonLink from '../../ui/Button/ButtonLink';
import { Box, Typography, CardMedia, Grid, Paper } from '@mui/material';

export default function Gap() {
  const news = [
    {
      title: 'News 1',
      content: 'Some exciting news...',
      imagePath: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1782&q=80',
    },
    {
      title: 'News 2',
      content: 'Some more exciting news...',
      imagePath: 'https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80',
    },
    // Add more news here...
  ];
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        News
      </Typography>
      <Grid container spacing={3}>
        {news.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper variant="outlined" square>
              <CardMedia
                component="img"
                height="140"
                image={item.imagePath}
                alt={item.title}
              />
              <Box p={2}>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <ButtonLink sx={{ JustifyContent: 'center' }}>Toutes les news</ButtonLink>
    </Box>
  );
}
