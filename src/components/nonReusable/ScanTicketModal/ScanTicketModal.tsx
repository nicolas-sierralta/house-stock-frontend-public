import React, { useCallback } from 'react';
import { Modal, ScrollView, View, ActivityIndicator, Image } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import {
  ModalContainer,
  ModalContent,
  Header,
  Title,
  CloseButton,
  CloseButtonText,
  ButtonRow,
  FooterButtonRow,
  Button,
  ButtonText
} from './ScanTicketModal.styles';
import { ScanTicketModalProps } from './ScanTicketModal.types';
import useScanTicket from '../../../hooks/useScanTicket';

/**
 * ScanTicketModal component allows users to select or capture an image of a ticket, then scan it for processing.
 *
 *
 * @param {ScanTicketModalProps} props - The props for the ScanTicketModal component.
 * @returns {JSX.Element} The rendered ScanTicketModal component.
 */
const ScanTicketModal: React.FC<ScanTicketModalProps> = ({ visible, onClose, onScan }) => {
  const { token } = useAuth();
  const memoizedOnScan = useCallback(onScan, []);

  const {
    imageUri,
    scanning,
    handleSelectImage,
    handleCaptureImage,
    handleScanImage,
  } = useScanTicket(visible, token, memoizedOnScan);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <Header>
            <Title>Scan Ticket</Title>
            <CloseButton onPress={onClose}>
              <CloseButtonText>×</CloseButtonText>
            </CloseButton>
          </Header>
          <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
            {imageUri && (
              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
              </View>
            )}
            {scanning && <ActivityIndicator size="large" color="#050315" />}
            <ButtonRow>
              <Button onPress={handleSelectImage}>
                <ButtonText>Select Image</ButtonText>
              </Button>
              <Button onPress={handleCaptureImage}>
                <ButtonText>Capture Image</ButtonText>
              </Button>
            </ButtonRow>
            {imageUri && (
              <FooterButtonRow>
                <Button onPress={handleScanImage}>
                  <ButtonText>Scan</ButtonText>
                </Button>
                <Button onPress={onClose}>
                  <ButtonText>Cancel</ButtonText>
                </Button>
              </FooterButtonRow>
            )}
          </ScrollView>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default ScanTicketModal;



