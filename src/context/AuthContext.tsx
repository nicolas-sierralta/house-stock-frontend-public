import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Defines the structure of the authentication context.
 */
export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
  logout: () => void;
}

/**
 * Creates a context for authentication.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication context to its children.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [email, setEmailState] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedToken) {
        setTokenState(storedToken);
      }
      if (storedEmail) {
        setEmailState(storedEmail);
      }
    };
    loadAuthData();
  }, []);

  const setToken = async (token: string | null) => {
    setTokenState(token);
    if (token) {
      await AsyncStorage.setItem('token', token);
    } else {
      await AsyncStorage.removeItem('token');
    }
  };

  const setEmail = async (email: string | null) => {
    setEmailState(email);
    if (email) {
      await AsyncStorage.setItem('email', email);
    } else {
      await AsyncStorage.removeItem('email');
    }
  };

  const logout = async () => {
    setTokenState(null);
    setEmailState(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, email, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use the authentication context.
 * @returns {AuthContextType} The authentication context.
 * @throws Will throw an error if used outside of an AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

