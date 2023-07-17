// 1. Import des modules nécessaires
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// 2. Création du contexte d'authentification
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 4. Initialisation de l'état authToken
  const [authToken, setAuthToken] = useState(Cookies.get('jwt') || null);

  // 5. Définition de la fonction getAuthToken
  const getAuthToken = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8000/api_v1/users/login', {
        email,
        password,
      });
      if (res.data.status === 'success') {
        return res.data.token;
      } else {
        throw new Error('Failed to log in');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 6. Définition de saveAuthToken
  const saveAuthToken = (token) => {
    Cookies.set('jwt', token, { expires: 7 });
    setAuthToken(token);
  };

  // 7. Définition de removeAuthToken
  const removeAuthToken = () => {
    Cookies.remove('jwt');
    setAuthToken(null);
  };

  // 8. Fourniture du contexte d'authentification à tous les composants enfants de AuthProvider
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

// 9. Définition du hook personnalisé useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context || { user: null, setAuthToken: () => {} };
};
