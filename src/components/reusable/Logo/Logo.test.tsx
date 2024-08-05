import React from 'react';
import { render } from '@testing-library/react-native';
import Logo from './Logo';

describe('Logo', () => {
  it('renders correctly with given source', () => {
    const { getByTestId } = render(<Logo source={require('../../assets/logo.png')} />);
    
    const logoElement = getByTestId('logo-image');
    expect(logoElement).toBeTruthy();
  });
});
