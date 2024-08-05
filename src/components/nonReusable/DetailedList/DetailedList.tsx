import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailModal from '../../reusable/DetailModal/DetailModal';
import useDetailedList from '../../../hooks/useDetailedList';
import { format } from 'date-fns';
import {
  Container,
  Card,
  CardTitle,
  CardText,
  CardLocation,
  ButtonContainer,
  ActionButton,
} from './DetailedList.styles';
import { DetailedListProps } from './DetailedList.types';

/**
 * DetailedList component displays a list of items with details and actions for editing and deleting items.
 *
 * 
 * @param {DetailedListProps} props - The props for the DetailedList component.
 * @returns {JSX.Element} The rendered DetailedList component.
 */
const DetailedList: React.FC<DetailedListProps> = ({ data, onEditItem, onDeleteItem }) => {
  const {
    selectedItem,
    modalVisible,
    handleItemPress,
    handleCloseModal,
  } = useDetailedList();

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';
    return format(d, 'dd/MM/yyyy');
  };

  return (
    <>
      <Container>
        {data.map((item, index) => (
          <Card key={index} onPress={() => handleItemPress(item)}>
            <CardTitle>{item.name}</CardTitle>
            <CardText>Store: {item.store}</CardText>
            <CardText>Quantity: {item.quantity}</CardText>
            <CardText>Price: {item.price}€</CardText>
            <CardText>Date: {formatDate(item.purchaseDate)}</CardText>
            <CardLocation>Location: {item.location}</CardLocation>

            <ButtonContainer>
              <ActionButton onPress={() => onEditItem(item)} testID="edit-button">
                <Icon name="edit" size={22} color="#7b6ffe" />
              </ActionButton>
              <ActionButton onPress={() => onDeleteItem(item)} testID="delete-button">
                <Icon name="delete" size={22} color="#2f27ce" />
              </ActionButton>
            </ButtonContainer>
          </Card>
        ))}
      </Container>
      {selectedItem && (
        <DetailModal
          visible={modalVisible}
          item={selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default DetailedList;
