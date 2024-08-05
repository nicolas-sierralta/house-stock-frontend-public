import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from './Header';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

// Mock de react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock de SideMenu
jest.mock('../SideMenu/SideMenu', () => 'SideMenu');

// Mock de useNavigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const MockedNavigator = ({ component }: { component: JSX.Element }) => {
  return (
    <NavigationContainer>
      {component}
    </NavigationContainer>
  );
};

describe('Header', () => {
  it('renders correctly with given title', () => {
    const { getByText } = render(
      <MockedNavigator component={<Header title="Test Title" toggleView={jest.fn()} />} />
    );

    expect(getByText('Test Title')).toBeTruthy();
  });
});



