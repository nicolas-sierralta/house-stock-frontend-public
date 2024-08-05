import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SortModal from './SortModal';
import { SortModalProps } from './SortModal.types';

describe('SortModal', () => {
  const defaultProps: SortModalProps = {
    visible: true,
    onClose: jest.fn(),
    onSort: jest.fn(),
  };

  it('renders correctly when visible', () => {
    const { getByText } = render(<SortModal {...defaultProps} />);

    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Price')).toBeTruthy();
    expect(getByText('Quantity')).toBeTruthy();
    expect(getByText('Purchase Date')).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();
  });

  it('calls onSort with the correct option when an option is pressed', () => {
    const { getByText } = render(<SortModal {...defaultProps} />);

    fireEvent.press(getByText('Name'));
    expect(defaultProps.onSort).toHaveBeenCalledWith('name');

    fireEvent.press(getByText('Price'));
    expect(defaultProps.onSort).toHaveBeenCalledWith('price');

    fireEvent.press(getByText('Quantity'));
    expect(defaultProps.onSort).toHaveBeenCalledWith('quantity');

    fireEvent.press(getByText('Purchase Date'));
    expect(defaultProps.onSort).toHaveBeenCalledWith('purchaseDate');
  });

  it('calls onClose when the Close button is pressed', () => {
    const { getByText } = render(<SortModal {...defaultProps} />);

    fireEvent.press(getByText('Close'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(<SortModal {...defaultProps} visible={false} />);

    expect(queryByText('Name')).toBeNull();
    expect(queryByText('Price')).toBeNull();
    expect(queryByText('Quantity')).toBeNull();
    expect(queryByText('Purchase Date')).toBeNull();
    expect(queryByText('Store')).toBeNull();
    expect(queryByText('Close')).toBeNull();
  });
});
