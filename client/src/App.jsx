import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './ui/theme';
import ProductFarmer from './pages/AllProductsFarmer';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/LoginPage';
import MyCards from './pages/MyCartPage';
import Payment from './pages/Payment';
import { AuthProvider, useAuth } from './context/authContext';
import Checkout from './pages/CheckoutPage';
import { Navigate } from 'react-router-dom';

export default function MyApp() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

function MyRoutes() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/homepage"
          element={user ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={user ? <ProductFarmer /> : <Navigate to="/login" />}
        />
        <Route
          path="/cards"
          element={user ? <MyCards /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={user ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/payment"
          element={user ? <Payment /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}