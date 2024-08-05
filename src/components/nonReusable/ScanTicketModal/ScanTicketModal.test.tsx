import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScanTicketModal from './ScanTicketModal';
import { InventoryItem } from '../../../types/types';
import { useAuth } from '../../../context/AuthContext';
import useScanTicket from '../../../hooks/useScanTicket';

jest.mock('../../../hooks/useScanTicket');
jest.mock('../../../context/AuthContext');

describe('ScanTicketModal', () => {
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseScanTicket = useScanTicket as jest.Mock;
  const onScanMock = jest.fn();
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({ token: 'mockToken' });
    mockUseScanTicket.mockReturnValue({
      imageUri: null,
      scanning: false,
      scanResult: null,
      handleSelectImage: jest.fn(),
      handleCaptureImage: jest.fn(),
      handleScanImage: jest.fn(),
    });
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(
      <ScanTicketModal
        visible={true}
        onClose={onCloseMock}
        onScan={onScanMock}
      />
    );

    expect(getByText('Scan Ticket')).toBeTruthy();
  });

  it('calls onClose when the close button is pressed', () => {
    const { getByText } = render(
      <ScanTicketModal
        visible={true}
        onClose={onCloseMock}
        onScan={onScanMock}
      />
    );

    fireEvent.press(getByText('×'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls handleSelectImage when the Select Image button is pressed', () => {
    const handleSelectImageMock = jest.fn();
    mockUseScanTicket.mockReturnValue({
      imageUri: null,
      scanning: false,
      scanResult: null,
      handleSelectImage: handleSelectImageMock,
      handleCaptureImage: jest.fn(),
      handleScanImage: jest.fn(),
    });

    const { getByText } = render(
      <ScanTicketModal
        visible={true}
        onClose={onCloseMock}
        onScan={onScanMock}
      />
    );

    fireEvent.press(getByText('Select Image'));
    expect(handleSelectImageMock).toHaveBeenCalled();
  });

  it('calls handleCaptureImage when the Capture Image button is pressed', () => {
    const handleCaptureImageMock = jest.fn();
    mockUseScanTicket.mockReturnValue({
      imageUri: null,
      scanning: false,
      scanResult: null,
      handleSelectImage: jest.fn(),
      handleCaptureImage: handleCaptureImageMock,
      handleScanImage: jest.fn(),
    });

    const { getByText } = render(
      <ScanTicketModal
        visible={true}
        onClose={onCloseMock}
        onScan={onScanMock}
      />
    );

    fireEvent.press(getByText('Capture Image'));
    expect(handleCaptureImageMock).toHaveBeenCalled();
  });

  it('calls handleScanImage when the Scan button is pressed', () => {
    const handleScanImageMock = jest.fn();
    mockUseScanTicket.mockReturnValue({
      imageUri: 'mockUri',
      scanning: false,
      scanResult: null,
      handleSelectImage: jest.fn(),
      handleCaptureImage: jest.fn(),
      handleScanImage: handleScanImageMock,
    });

    const { getByText } = render(
      <ScanTicketModal
        visible={true}
        onClose={onCloseMock}
        onScan={onScanMock}
      />
    );

    fireEvent.press(getByText('Scan'));
    expect(handleScanImageMock).toHaveBeenCalled();
  });
});
