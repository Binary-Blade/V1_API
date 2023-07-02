// LoginPage.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/api_v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const userData = await response.json();

      // Perform additional logic here...
      if (response.ok) {
        // replace the current page in the history stack and navigate to homepage
        navigate('/homepage', { replace: 'true' });
      } else {
        // handle login error...
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
