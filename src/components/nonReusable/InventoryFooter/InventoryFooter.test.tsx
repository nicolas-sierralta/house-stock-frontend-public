import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InventoryFooter from './InventoryFooter';
import { FooterProps } from './InventoryFooter.types';
import { InventoryItem } from '../../../types/types';

// Mock the imported components
jest.mock('../../nonReusable/SortModal/SortModal', () => {
  return ({ visible }: { visible: boolean }) => (visible ? <div  /> : null);
});
jest.mock('../../nonReusable/AddProductModal/AddProductModal', () => {
  return ({ visible }: { visible: boolean }) => (visible ? <div /> : null);
});
jest.mock('../../nonReusable/FilterModal/FilterModal', () => {
  return ({ visible }: { visible: boolean }) => (visible ? <div  /> : null);
});
jest.mock('../../nonReusable/ScanTicketModal/ScanTicketModal', () => {
  return ({ visible }: { visible: boolean }) => (visible ? <div /> : null);
});

const mockInventoryItem: InventoryItem = {
  id: '1',
  name: 'Item 1',
  quantity: 10,
  price: 100,
  purchaseDate: '2023-01-01',
  store: 'Store 1',
  location: 'Location 1',
};

const defaultProps: FooterProps = {
  toggleView: jest.fn(),
  detailedView: false,
  onAddProduct: jest.fn(),
  onFilter: jest.fn(),
  onSort: jest.fn(),
  toggleSortOrder: jest.fn(),
  sortDescending: false,
  existingLocations: ['Location 1', 'Location 2'],
  existingShops: ['Shop 1', 'Shop 2'],
  inventoryData: [mockInventoryItem],
  originalData: [mockInventoryItem],
  onScanTicket: jest.fn(),
};

describe('InventoryFooter', () => {
  it('renders correctly', () => {
    const { getByText } = render(<InventoryFooter {...defaultProps} />);

    expect(getByText('Filtrar')).toBeTruthy();
    expect(getByText('Ordenar')).toBeTruthy();
    expect(getByText('Escanear')).toBeTruthy();
    expect(getByText('Añadir')).toBeTruthy();
    expect(getByText('Ascendente')).toBeTruthy();
  });

  it('calls toggleSortOrder when sort order button is pressed', () => {
    const { getByText } = render(<InventoryFooter {...defaultProps} />);

    fireEvent.press(getByText('Ascendente'));
    expect(defaultProps.toggleSortOrder).toHaveBeenCalled();
  });


 
});

