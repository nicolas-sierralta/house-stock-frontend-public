import { useState } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { InventoryItem } from '../types/types';

/**
 * Custom hook for managing product details including selecting an item and handling modal visibility.
 * 
 * @returns {Object} - Returns the selected item, modal visibility state, position, and functions to handle item press, close modal, set selected item, and set modal visibility.
 */
const useProductDetails = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /**
   * Handles the press event on an item, sets the position, and shows the modal with item details.
   * 
   * @param {InventoryItem} item - The item that was pressed.
   * @param {NativeSyntheticEvent<NativeTouchEvent>} event - The press event containing the touch coordinates.
   */
  const handleItemPress = (item: InventoryItem, event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { pageX, pageY } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setSelectedItem(item);
    setModalVisible(true);
  };

  /**
   * Closes the modal and resets the selected item.
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return { 
    selectedItem, 
    modalVisible, 
    position, 
    handleItemPress, 
    handleCloseModal, 
    setSelectedItem, 
    setModalVisible 
  };
};

export default useProductDetails;
