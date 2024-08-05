import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { SortModalProps } from './SortModal.types';
import { styles } from './SortModal.styles';

/**
 * SortModal component provides a modal for selecting sorting options.
 *
 * 
 * @param {SortModalProps} props - The props for the SortModal component.
 * @returns {JSX.Element} The rendered SortModal component.
 */
const SortModal: React.FC<SortModalProps> = ({ visible, onClose, onSort }) => {
  const sortingOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Quantity', value: 'quantity' },
    { label: 'Purchase Date', value: 'purchaseDate' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {sortingOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionButton}
              onPress={() => {
                onSort(option.value);
                onClose();
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;

