import React from 'react';
import { Modal } from 'react-native';
import useDetailModal from '../../../hooks/useDetailModal';
import {
  Background,
  DetailCard,
  CloseButton,
  CloseButtonText,
  CardTitle,
  CardText,
} from './DetailModal.styles';
import { DetailModalProps } from './DetailModal.types';

/**
 * DetailModal component displays detailed information about an item in a modal.
 *
 * @param {DetailModalProps} props - The props for the DetailModal component.
 * @returns {JSX.Element} The rendered DetailModal component.
 */
const DetailModal: React.FC<DetailModalProps> = ({ visible, item, onClose }) => {
  const { scaleAnim, formatDate } = useDetailModal(visible);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Background>
        <DetailCard style={{ transform: [{ scale: scaleAnim }] }}>
          <CloseButton onPress={onClose}>
            <CloseButtonText>Close</CloseButtonText>
          </CloseButton>
          <CardTitle>{item.name}</CardTitle>
          <CardText>Store: {item.store}</CardText>
          <CardText>Quantity: {item.quantity}</CardText>
          <CardText>Price: {item.price}€</CardText>
          <CardText>Purchase Date: {formatDate(item.purchaseDate)}</CardText>
          <CardText>Location: {item.location}</CardText>
        </DetailCard>
      </Background>
    </Modal>
  );
};

export default DetailModal;

