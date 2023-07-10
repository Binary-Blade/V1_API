import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; // Importer AuthContext

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext); // Utiliser le setter du token depuis le contexte

  const onSubmit = async (data) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8000/api_v1/users/login', // replace with your API endpoint
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });

      if (response.data.status === 'success') {
        setAuthToken(response.data.token); // Utiliser le setter pour mettre à jour le token dans le contexte
        // replace the current page in the history stack and navigate to homepage
        navigate('/homepage', { replace: 'true' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" {...register('email')} fullWidth />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button component={Link} to="/forgotPassword">
          Forgot Password?
        </Button>
        <Button component={Link} to="/signup">
          Don't have an account? Signup here
        </Button>
      </form>
    </Container>
  );
}