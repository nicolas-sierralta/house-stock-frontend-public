import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('renders correctly and handles button click event', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Button text="Login" onPress={mockFn} />);
    
    const buttonElement = getByText('Login');
    fireEvent.press(buttonElement);

    expect(buttonElement).toBeTruthy();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
