import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FilterModal from './FilterModal';
import { InventoryItem } from '../../../types/types';

jest.mock('@react-native-community/datetimepicker', () => {
  return ({ onChange, value }: { onChange: any, value: any }) => {
    const handleClick = () => onChange({}, value);
    return <button onClick={handleClick}>OK</button>;
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('@ptomasroos/react-native-multi-slider', () => 'MultiSlider');

const mockData: InventoryItem[] = [
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

describe('FilterModal', () => {
  const mockOnClose = jest.fn();
  const mockOnApplyFilters = jest.fn();

  const setup = (visible: boolean) => {
    return render(
      <FilterModal
        visible={visible}
        onClose={mockOnClose}
        onApplyFilters={mockOnApplyFilters}
        originalData={mockData}
        maxQuantity={20}
      />
    );
  };

  it('renders correctly when visible', () => {
    const { getByText, getByPlaceholderText, getAllByText } = setup(true);

    expect(getByText('Filter Inventory')).toBeTruthy();
    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getAllByText('Store').length).toBeGreaterThan(0);
    expect(getByText('All Stores')).toBeTruthy();
    expect(getByText('Shop1')).toBeTruthy();
    expect(getByText('Shop2')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const { getByText } = setup(true);

    fireEvent.press(getByText('×'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('applies filters correctly', () => {
    const { getByText, getByPlaceholderText } = setup(true);

    fireEvent.changeText(getByPlaceholderText('Name'), 'Tomato');
    fireEvent.press(getByText('All Stores'));
    fireEvent.press(getByText('Shop1'));
    fireEvent.press(getByText('Apply'));

    waitFor(() => {
      expect(mockOnApplyFilters).toHaveBeenCalledWith({
        name: 'Tomato',
        store: 'Shop1',
        quantityRange: [1, 20],
        location: '',
        startDate: null,
        endDate: null,
      });
    });
  });

  it('resets filters correctly', () => {
    const { getByText } = setup(true);

    fireEvent.press(getByText('Reset'));

    waitFor(() => {
      expect(mockOnApplyFilters).toHaveBeenCalledWith({});
    });
  });

});



