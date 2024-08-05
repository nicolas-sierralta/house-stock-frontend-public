import { useState } from 'react';
import { InventoryItem } from '../types/types';

/**
 * Custom hook for managing the state and logic for a detailed list of inventory items.
 *
 * @returns {object} The state and handlers for managing the detailed list and modal visibility.
 */
const useDetailedList = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Handles the event when an item is pressed.
   *
   * @param {InventoryItem} item - The inventory item that was pressed.
   */
  const handleItemPress = (item: InventoryItem) => {
    // Ensure the date is in a valid format
    let formattedDate = item.purchaseDate;
    if (isNaN(new Date(item.purchaseDate).getTime())) {
      // If the date is not valid, set it to an empty string
      formattedDate = '';
    }
    setSelectedItem({ ...item, purchaseDate: formattedDate });
    setModalVisible(true);
  };

  /**
   * Handles the event when the modal is closed.
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return {
    selectedItem,
    modalVisible,
    handleItemPress,
    handleCloseModal,
  };
};

export default useDetailedList;
