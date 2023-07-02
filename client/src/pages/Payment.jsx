import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

export default function PaymentPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Paiement
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/checkout"
          >
            Retour
          </Button>
        </Box>
      </Box>
      <Card>
        <CardContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              p: 2,
            }}
          >
            <TextField
              label="Nom sur la carte"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Numéro de la carte"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCardIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <TextField label="Date d'expiration" variant="outlined" />
              <TextField label="CVV" variant="outlined" />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Payer
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
