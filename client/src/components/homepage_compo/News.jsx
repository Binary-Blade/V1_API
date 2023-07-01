import React from 'react';
import ButtonLink from '../../ui/Button/ButtonLink';
import { Box, Typography, CardMedia, Grid, Paper } from '@mui/material';

export default function Gap() {
  const news = [
    {
      title: 'News 1',
      content: 'Some exciting news...',
      imagePath: '/path-to-your-image-3.png',
    },
    {
      title: 'News 2',
      content: 'Some more exciting news...',
      imagePath: '/path-to-your-image-4.png',
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
