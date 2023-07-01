import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import theme from '../../ui/theme';
import { Stack } from '@mui/material';

export default function CardFarms({ nameFarm, describeFarm }) {
    const [value, setValue] = React.useState(2);
  return (
    <Card
      sx={{
        maxWidth: 200,
        bgcolor: theme.palette.background.secondary,
        backgroundSize: 'center',
      }}
    >
      <CardContent>
        <Stack>
        <Rating name="read-only" value={value} readOnly />
        <Typography
          variant="body"
          sx={{ color: theme.palette.title.primary, fontSize: 12 }}
        >
          Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description 
        </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          sx={{ color: theme.palette.title.primary, fontSize: 12 }}
        >
          Nom d'un acheteur
        </Button>
      </CardActions>
    </Card>
  );
}
