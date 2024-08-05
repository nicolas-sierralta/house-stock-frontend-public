import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DetailedList from './DetailedList';
import { InventoryItem } from '../../../types/types';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('../../reusable/DetailModal/DetailModal', () => 'DetailModal');

const data: InventoryItem[] = [
  {
    id: '1',
    name: 'Tomato',
    quantity: 10,
    price: 5.5,
    purchaseDate: '2022-01-01T00:00:00Z',
    store: 'Shop1',
    location: 'Warehouse',
  },
  {
    id: '2',
    name: 'Potato',
    quantity: 20,
    price: 3.5,
    purchaseDate: '2022-02-02T00:00:00Z',
    store: 'Shop2',
    location: 'Store',
  },
];

describe('DetailedList', () => {
  const mockOnEditItem = jest.fn();
  const mockOnDeleteItem = jest.fn();

  const setup = () => {
    const utils = render(
      <DetailedList
        data={data}
        onEditItem={mockOnEditItem}
        onDeleteItem={mockOnDeleteItem}
      />
    );
    return {
      ...utils,
    };
  };

  it('renders correctly', () => {
    const { getByText } = setup();

    expect(getByText('Tomato')).toBeTruthy();
    expect(getByText('Store: Shop1')).toBeTruthy();
    expect(getByText('Quantity: 10')).toBeTruthy();
    expect(getByText('Price: 5.5€')).toBeTruthy();
    expect(getByText('Date: 01/01/2022')).toBeTruthy();
    expect(getByText('Location: Warehouse')).toBeTruthy();

    expect(getByText('Potato')).toBeTruthy();
    expect(getByText('Store: Shop2')).toBeTruthy();
    expect(getByText('Quantity: 20')).toBeTruthy();
    expect(getByText('Price: 3.5€')).toBeTruthy();
    expect(getByText('Date: 02/02/2022')).toBeTruthy();
    expect(getByText('Location: Store')).toBeTruthy();
  });

  it('calls onEditItem when edit button is pressed', () => {
    const { getAllByTestId } = setup();

    const editButtons = getAllByTestId('edit-button');
    fireEvent.press(editButtons[0]);

    expect(mockOnEditItem).toHaveBeenCalledWith(data[0]);
  });

  it('calls onDeleteItem when delete button is pressed', () => {
    const { getAllByTestId } = setup();

    const deleteButtons = getAllByTestId('delete-button');
    fireEvent.press(deleteButtons[0]);

    expect(mockOnDeleteItem).toHaveBeenCalledWith(data[0]);
  });
});

