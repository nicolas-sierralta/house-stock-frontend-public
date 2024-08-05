import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import useLogin from '../../hooks/useLogin';
import { NavigationContainer } from '@react-navigation/native';

// Mock the custom hook
jest.mock('../../hooks/useLogin');

const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;

describe('LoginScreen', () => {
  beforeEach(() => {
    mockUseLogin.mockReturnValue({
      email: '',
      setEmail: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      loading: false,
      handleLogin: jest.fn(),
    });
  });

  it('renders correctly and handles user input and login', async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockUseLogin().setEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockUseLogin().setPassword).toHaveBeenCalledWith('password123');
      expect(mockUseLogin().handleLogin).toHaveBeenCalled();
    });
  });
});
