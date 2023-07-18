import React, { useContext } from 'react';
import api from './../api/api';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Stack,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import theme from '../ui/theme';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/users/login', data);

      if (response.data.status === 'success') {
        setAuthToken(response.data.token);
        navigate('/homepage', { replace: 'true' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontSize: '32px',
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: theme.palette.title.primary,
            textDecoration: 'none',
          }}
        >
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button component={Link} to="/forgotPassword">
              Forgot Password?
            </Button>
            <Button component={Link} to="/signup">
              Don't have an account? Signup here
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
