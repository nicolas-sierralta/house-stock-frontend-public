import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders correctly and handles text input', () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(<TextInput placeholder="Email" value="" onChangeText={mockFn} />);
    
    const inputElement = getByPlaceholderText('Email');
    fireEvent.changeText(inputElement, 'test@example.com');

    expect(inputElement).toBeTruthy();
    expect(mockFn).toHaveBeenCalledWith('test@example.com');
  });
});
