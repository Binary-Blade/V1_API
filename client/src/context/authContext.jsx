// context/authContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get('jwt') || null); // Get initial token from cookies or set to null

  const getAuthToken = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8000/api_v1/users/login', {
        email,
        password,
      });

      if (res.data.status === 'success') {
        return res.data.token; // Return the token so it can be stored
      } else {
        throw new Error('Failed to log in');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveAuthToken = (token) => {
    Cookies.set('jwt', token, { expires: 7 }); // Store token in a cookie
    setAuthToken(token); // And in state
  };
  const removeAuthToken = () => {
    Cookies.remove('jwt'); // Remove the token from the cookie
    setAuthToken(null); // And remove it from state
  };

  return (
    <AuthContext.Provider
      value={{
        user: Boolean(authToken),
        authToken,
        getAuthToken,
        setAuthToken: saveAuthToken,
        removeAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context || { user: null, setAuthToken: () => {} };
};
