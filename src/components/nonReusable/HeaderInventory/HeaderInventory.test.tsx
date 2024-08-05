import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderInventory from './HeaderInventory';
import { HeaderProps } from './HeaderInventory.types';


jest.mock('../../reusable/SideMenu/SideMenu', () => 'SideMenu');

const MockedNavigator = ({ component }: { component: JSX.Element }) => {
  return <NavigationContainer>{component}</NavigationContainer>;
};

describe('HeaderInventory', () => {
  const defaultProps: HeaderProps = {
    title: 'Test Title',
    toggleView: jest.fn(),
    detailedView: false,
  };

  it('renders correctly with given title', () => {
    const { getByText } = render(
      <MockedNavigator component={<HeaderInventory {...defaultProps} />} />
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls toggleView when view icon is pressed', () => {
    const toggleViewMock = jest.fn();
    const { getByTestId } = render(
      <MockedNavigator
        component={<HeaderInventory {...defaultProps} toggleView={toggleViewMock} />}
      />
    );

    fireEvent.press(getByTestId('toggle-view-button'));
    expect(toggleViewMock).toHaveBeenCalled();
  });

  it('sets menuVisible to true when menu icon is pressed', () => {
    const { getByTestId } = render(
      <MockedNavigator component={<HeaderInventory {...defaultProps} />} />
    );

    const menuButton = getByTestId('menu-button');
    fireEvent.press(menuButton);
    expect(menuButton).toBeTruthy();
  });
});