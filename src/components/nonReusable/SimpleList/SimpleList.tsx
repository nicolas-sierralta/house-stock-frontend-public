import React, { useState } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SimpleListProps } from './SimpleList.types';
import DetailModal from '../../reusable/DetailModal/DetailModal';
import {
  SimpleListContainer,
  SimpleListHeader,
  SimpleListItem,
  Column,
  ListItemText,
  ListHeaderText,
  ActionColumn,
  ActionButton,
  TouchableColumn,
} from './SimpleList.styles';
import { InventoryItem } from '../../../types/types';

/**
 * SimpleList component displays a list of inventory items with options to edit or delete each item.
 *
 * 
 * @param {SimpleListProps} props - The props for the SimpleList component.
 * @returns {JSX.Element} The rendered SimpleList component.
 */
const SimpleList: React.FC<SimpleListProps> = ({ data, onDeleteItem, onEditItem }) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Handles the press event on a list item, opening the detail modal.
   *
   * @param {InventoryItem} item - The item that was pressed.
   * @param {NativeSyntheticEvent<NativeTouchEvent>} event - The press event.
   */
  const handleItemPress = (item: InventoryItem, event: NativeSyntheticEvent<NativeTouchEvent>) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  /**
   * Closes the detail modal.
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <SimpleListContainer>
      <SimpleListHeader>
        <Column>
          <ListHeaderText>Quantity</ListHeaderText>
        </Column>
        <Column>
          <ListHeaderText>Name</ListHeaderText>
        </Column>
        <Column>
          <ListHeaderText>Actions</ListHeaderText>
        </Column>
      </SimpleListHeader>
      {data.map((item, index) => (
        <SimpleListItem key={index}>
          <Column>
            <ListItemText>{item.quantity}</ListItemText>
          </Column>
          <TouchableColumn
            onPress={(event: NativeSyntheticEvent<NativeTouchEvent>) => handleItemPress(item, event)}
            testID={`item-${index}`}
          >
            <ListItemText>{item.name}</ListItemText>
          </TouchableColumn>
          <ActionColumn>
            <ActionButton onPress={() => onEditItem(item)} testID={`edit-button-${index}`}>
              <Icon name="edit" size={24} color="#7b6ffe" />
            </ActionButton>
            <ActionButton onPress={() => onDeleteItem(item)} testID={`delete-button-${index}`}>
              <Icon name="delete" size={24} color="#2f27ce" />
            </ActionButton>
          </ActionColumn>
        </SimpleListItem>
      ))}
      {selectedItem && (
        <DetailModal
          visible={modalVisible}
          item={selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </SimpleListContainer>
  );
};

export default SimpleList;


