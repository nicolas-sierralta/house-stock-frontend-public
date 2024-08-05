import { useState } from 'react';
import { Alert } from 'react-native';
import axios, { AxiosError } from 'axios';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';

const useRegister = () => {
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, setEmail, setToken } = useAuth();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  
  const validateFullName = (fullName: string) => {
    const regex = /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/;
    return regex.test(fullName);
  };

  const validatePassword = (password: string) => {
    const hasSixCharacters = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasSixCharacters && hasLetter && hasNumber;
  };

  const handleRegister = async () => {
    if (!validateFullName(fullName)) {
      Alert.alert('Error', 'Full name must contain at least 3 letters, a space, and 3 more letters.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long and contain at least one letter and one number.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      if (!apiUrl) {
        throw new Error('API URL is not defined');
      }

      const formattedDate = convertDateForSave(dateOfBirth);

      await axios.post(`${apiUrl}/auth/register`, {
        fullName,
        email,
        password,
        dateOfBirth: formattedDate,
      });

      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      const { token } = response.data;
      setToken(token);

      Alert.alert('Success', 'Registration complete');
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

  const handleAxiosError = (error: AxiosError) => {
    let message = 'An unknown error occurred';
    if (error.response) {
      if (error.response.status === 400) {
        message = 'Invalid registration details. Please check your input and try again.';
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
    console.error('Registration failed:', message);
    Alert.alert('Registration Failed', message);
  };

  const handleUnknownError = (error: unknown) => {
    const message = 'An unknown error occurred';
    console.error('Registration failed:', message, error);
    Alert.alert('Registration Failed', message);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate;
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
      setDateOfBirth(formattedDate);
    }
  };

  const convertDateForSave = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    dateOfBirth,
    showDatePicker,
    setShowDatePicker,
    loading,
    handleRegister,
    onChangeDate,
  };
};

export default useRegister;




