// context/authContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get('jwt')); // Get initial token from cookies

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

  return (
    <AuthContext.Provider
      value={{ authToken, getAuthToken, setAuthToken: saveAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
