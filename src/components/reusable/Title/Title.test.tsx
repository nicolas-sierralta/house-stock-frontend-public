import React from 'react';
import { render } from '@testing-library/react-native';
import Title from './Title';

describe('Title', () => {
  it('renders correctly with given text', () => {
    const { getByText } = render(<Title text="Welcome to House Stock" />);
    
    const titleElement = getByText('Welcome to House Stock');
    expect(titleElement).toBeTruthy();
  });
});
