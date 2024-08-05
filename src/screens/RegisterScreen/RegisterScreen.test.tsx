import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from './RegisterScreen';
import useRegister from '../../hooks/useRegister';
import { NavigationContainer } from '@react-navigation/native';

// Mock the custom hook
jest.mock('../../hooks/useRegister');

const mockUseRegister = useRegister as jest.MockedFunction<typeof useRegister>;

describe('RegisterScreen', () => {
  beforeEach(() => {
    mockUseRegister.mockReturnValue({
      fullName: '',
      setFullName: jest.fn(),
      email: '',
      setEmail: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      confirmPassword: '',
      setConfirmPassword: jest.fn(),
      dateOfBirth: '',
      showDatePicker: false,
      setShowDatePicker: jest.fn(),
      loading: false,
      handleRegister: jest.fn(),
      onChangeDate: jest.fn(),
    });
  });

  it('renders correctly and handles user input and registration', async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    const fullNameInput = getByPlaceholderText('Full Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const dateOfBirthInput = getByText('Date of Birth (DD/MM/YYYY)');
    const registerButton = getByText('Sign Up');

    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');
    fireEvent.press(dateOfBirthInput);
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(mockUseRegister().setFullName).toHaveBeenCalledWith('John Doe');
      expect(mockUseRegister().setEmail).toHaveBeenCalledWith('john@example.com');
      expect(mockUseRegister().setPassword).toHaveBeenCalledWith('password123');
      expect(mockUseRegister().setConfirmPassword).toHaveBeenCalledWith('password123');
      expect(mockUseRegister().handleRegister).toHaveBeenCalled();
    });
  });
});

