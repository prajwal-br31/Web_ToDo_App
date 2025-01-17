// src/context/AuthContext.jsx

import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadAuthState = async () => {
      const storedAuthState = await AsyncStorage.getItem('isAuthenticated');
      if (storedAuthState !== null) {
        setIsAuthenticated(JSON.parse(storedAuthState));
      }
    };
    loadAuthState();
  }, []);

  const login = async (username, password) => {
    if (username === 'user' && password === 'pass') {
      await AsyncStorage.setItem('isAuthenticated', JSON.stringify(true));
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
