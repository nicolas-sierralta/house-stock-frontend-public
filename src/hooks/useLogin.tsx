import { useState } from 'react';
import { Alert } from 'react-native';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';

/**
 * Defines the structure of the return value for the useLogin hook.
 */
export interface UseAuthReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  handleLogin: () => Promise<void>;
}

/**
 * Custom hook for handling user login.
 *
 * @returns {UseAuthReturn} The email, setEmail, password, setPassword, loading state, and handleLogin function.
 */
const useLogin = (): UseAuthReturn => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setToken, setEmail: setAuthEmail } = useAuth();

  // Use process.env to access the API URL
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  /**
   * Handles the login process.
   */
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!apiUrl) {
        throw new Error('API URL is not defined');
      }

      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      const { token } = response.data;
      setToken(token);
      setAuthEmail(email); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        handleUnknownError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles Axios errors.
   *
   * @param {AxiosError} error - The error object returned by Axios.
   */
  const handleAxiosError = (error: AxiosError) => {
    let message = 'An unknown error occurred';
    if (error.response) {
      if (error.response.status === 401) {
        message = 'Invalid email or password. Please try again.';
      } else if (error.response.status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (error.response.data) {
        message = error.response.data as string;
      }
    } else if (error.request) {
      message = 'No response from server. Please check your network connection.';
    } else {
      message = error.message;
    }
    console.error('Login failed:', message);
    Alert.alert('Login Failed', message);
  };

  /**
   * Handles unknown errors.
   *
   * @param {unknown} error - The unknown error object.
   */
  const handleUnknownError = (error: unknown) => {
    const message = 'An unknown error occurred';
    console.error('Login failed:', message, error);
    Alert.alert('Login Failed', message);
  };

  return { email, setEmail, password, setPassword, loading, handleLogin };
};

export default useLogin;
