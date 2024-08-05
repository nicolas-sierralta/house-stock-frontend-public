import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import SimpleList from './SimpleList';
import { InventoryItem } from '../../../types/types';

const mockData: InventoryItem[] = [
  { id: '1', name: 'Item 1', quantity: 10, price: 100, purchaseDate: '2023-01-01T00:00:00Z', store: 'Store 1', location: 'Location 1' },
  { id: '2', name: 'Item 2', quantity: 20, price: 200, purchaseDate: '2023-01-01T00:00:00Z', store: 'Store 2', location: 'Location 2' },
];


describe('SimpleList', () => {
  it('renders list items correctly', () => {
    const { getByText } = render(
      <SimpleList data={mockData} onDeleteItem={jest.fn()} onEditItem={jest.fn()} />
    );

    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
    expect(getByText('20')).toBeTruthy();
  });

  it('calls onEditItem when edit button is pressed', async () => {
    const onEditItemMock = jest.fn();
    const { getByTestId } = render(
      <SimpleList data={mockData} onDeleteItem={jest.fn()} onEditItem={onEditItemMock} />
    );

    await act(async () => {
      fireEvent.press(getByTestId('edit-button-0'));
    });

    expect(onEditItemMock).toHaveBeenCalledWith(mockData[0]);
  });

  it('calls onDeleteItem when delete button is pressed', async () => {
    const onDeleteItemMock = jest.fn();
    const { getByTestId } = render(
      <SimpleList data={mockData} onDeleteItem={onDeleteItemMock} onEditItem={jest.fn()} />
    );

    await act(async () => {
      fireEvent.press(getByTestId('delete-button-0'));
    });

    expect(onDeleteItemMock).toHaveBeenCalledWith(mockData[0]);
  });

});
