import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import theme from './../ui/theme';

export default function ImgMediaCard() {
  return (
    <Card
      sx={{
        maxWidth: 500,
        bgcolor: theme.palette.background.secondary,
        backgroundSize: 'contain',
      }}
    >
      <CardMedia
        component="img"
        alt="image"
        height="180"
        image="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          color={theme.palette.title.primary}
        >
          FERME
        </Typography>
        <Typography
          variant="body"
          sx={{ color: theme.palette.title.primary, fontSize: 12 }}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          sx={{ color: theme.palette.title.primary, fontSize: 12 }}
        >
          Notre ferme
        </Button>
        <Button
          size="large"
          sx={{ color: theme.palette.title.primary, fontSize: 12 }}
        >
          Nos produits
        </Button>
      </CardActions>
    </Card>
  );
}
