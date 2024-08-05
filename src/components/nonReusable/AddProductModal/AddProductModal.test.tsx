import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddProductModal from './AddProductModal';
import { AuthProvider } from '../../../context/AuthContext';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

const existingLocations = ['Warehouse', 'Store'];
const existingShops = ['Shop1', 'Shop2'];

describe('AddProductModal', () => {
  const mockOnAdd = jest.fn();
  const mockOnClose = jest.fn();

  const setup = () => {
    const utils = render(
      <AuthProvider>
        <AddProductModal
          visible={true}
          onClose={mockOnClose}
          onAdd={mockOnAdd}
          existingLocations={existingLocations}
          existingShops={existingShops}
        />
      </AuthProvider>
    );
    return {
      ...utils,
    };
  };

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByText('Add Product')).toBeTruthy();
    expect(getByPlaceholderText('Tomato')).toBeTruthy();
    expect(getByPlaceholderText('Enter quantity')).toBeTruthy();
    expect(getByPlaceholderText('Enter amount')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const { getByText } = setup();

    fireEvent.press(getByText('×'));
    expect(mockOnClose).toHaveBeenCalled();
  });

});


