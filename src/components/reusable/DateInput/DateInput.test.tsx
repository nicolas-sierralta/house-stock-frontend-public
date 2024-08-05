import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DateInput from './DateInput';

describe('DateInput', () => {
  it('renders correctly and handles date input', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<DateInput dateOfBirth="" onPress={mockFn} />);
    
    const dateInputElement = getByText('Date of Birth (DD/MM/YYYY)');
    fireEvent.press(dateInputElement);

    expect(dateInputElement).toBeTruthy();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
