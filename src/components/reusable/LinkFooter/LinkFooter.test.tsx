import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LinkFooter from './LinkFooter';

describe('LinkFooter', () => {
  it('renders correctly and navigates to the given route', () => {
    const { getByText } = render(
      <NavigationContainer>
        <LinkFooter text="Don't have an account?" linkText="Sign up" linkRoute="Register" />
      </NavigationContainer>
    );

    const linkElement = getByText('Sign up');
    expect(linkElement).toBeTruthy();
  });
});
