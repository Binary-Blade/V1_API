import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';

export default function PaymentPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center">
          Paiement
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', m: 1 }}
          >
            <TextField
              label="Nom sur la carte"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Numéro de la carte"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <TextField
                label="Date d'expiration"
                variant="outlined"
                sx={{ width: '45%' }}
              />
              <TextField label="CVV" variant="outlined" sx={{ width: '45%' }} />
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
