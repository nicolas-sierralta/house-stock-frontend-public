import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import DetailModal from './DetailModal';
import { InventoryItem } from '../../../types/types';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

const mockItem: InventoryItem = {
  id: '1',
  name: 'Test Product',
  price: 100,
  quantity: 2,
  purchaseDate: '2022-01-01T00:00:00Z', // ISO 8601 format
  store: 'Test Store',
  location: 'Test Location',
};

describe('DetailModal', () => {
  const mockOnClose = jest.fn();

  const setup = (visible: boolean) => {
    return render(
      <DetailModal
        visible={visible}
        item={mockItem}
        onClose={mockOnClose}
      />
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    mockOnClose.mockClear();
  });

  it('renders correctly when visible', async () => {
    const { getByText } = setup(true);

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('Store: Test Store')).toBeTruthy();
      expect(getByText('Quantity: 2')).toBeTruthy();
      expect(getByText('Price: 100€')).toBeTruthy();
      expect(getByText('Purchase Date: 01/01/2022')).toBeTruthy(); // Formatted date
      expect(getByText('Location: Test Location')).toBeTruthy();
    });
  });

  it('does not render when not visible', async () => {
    const { queryByText } = setup(false);

    expect(queryByText('Test Product')).toBeNull();
  });

  it('calls onClose when the close button is pressed', async () => {
    const { getByText } = setup(true);

    act(() => {
      fireEvent.press(getByText('Close'));
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});