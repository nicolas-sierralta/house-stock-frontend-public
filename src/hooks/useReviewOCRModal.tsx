import { useState, useEffect } from 'react';
import { InventoryItem } from '../types/types';
import { format } from 'date-fns';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

/**
 * Custom hook for managing the review of OCR (Optical Character Recognition) data in a modal.
 * 
 * @param {InventoryItem[]} ocrData - The OCR data to be reviewed.
 * @param {Function} onAdd - Function to call when an item is added.
 * @param {Function} onClose - Function to call when the modal is closed.
 * 
 * @returns {Object} - Returns state variables and handler functions for managing the review process.
 */
const useReviewOCRModal = (
  ocrData: InventoryItem[], 
  onAdd: (newItem: InventoryItem) => void, 
  onClose: () => void
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(ocrData[0] || null);
  const [isNewStore, setIsNewStore] = useState(false);
  const [isNewLocation, setIsNewLocation] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (ocrData.length > 0) {
      setCurrentItem(ocrData[0]);
    }
  }, [ocrData]);

  useEffect(() => {
    if (currentItem) {
      // Validate if the price is invalid or unavailable, and set it to 0 if necessary.
      if (typeof currentItem.price !== 'number' || isNaN(currentItem.price)) {
        setCurrentItem({ ...currentItem, price: 0 });
      }
    }
  }, [currentItem]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [currentItem, isNewStore, isNewLocation]);

  /**
   * Formats the date to DD/MM/YYYY.
   *
   * @param {string} date - The date to format.
   * @returns {string} The formatted date.
   */
  const formatDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Converts the date from DD/MM/YYYY to YYYY-MM-DD.
   *
   * @param {string} date - The date to convert.
   * @returns {string} The converted date.
   */
  const convertDateForSave = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  /**
   * Validates the form fields.
   *
   * @returns {boolean} True if all fields are filled, otherwise false.
   */
  const validateForm = () => {
    if (!currentItem) return false;
    return (
      currentItem.name.trim() !== '' &&
      currentItem.quantity > 0 &&
      currentItem.price >= 0 &&
      currentItem.purchaseDate.trim() !== '' &&
      (isNewStore ? currentItem.store.trim() !== '' : currentItem.store.trim() !== '') &&
      (isNewLocation ? currentItem.location.trim() !== '' : currentItem.location.trim() !== '')
    );
  };

  /**
   * Handles adding the current item and moving to the next item.
   */
  const handleAdd = () => {
    if (currentItem) {
      const itemToAdd = {
        ...currentItem,
        purchaseDate: convertDateForSave(currentItem.purchaseDate),
      };
      onAdd(itemToAdd);
      handleNext();
    }
  };

  /**
   * Handles discarding the current item and moving to the next item.
   */
  const handleDiscard = () => {
    handleNext();
  };

  /**
   * Handles moving to the next item in the OCR data.
   */
  const handleNext = () => {
    if (currentIndex < ocrData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentItem(ocrData[nextIndex]);
    } else {
      onClose();
    }
  };

  /**
   * Handles the change of date in the date picker.
   * 
   * @param {DateTimePickerEvent} event - The date picker event.
   * @param {Date} selectedDate - The selected date.
   */
  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && currentItem) {
      const formattedDate = format(selectedDate, 'dd/MM/yyyy');
      setCurrentItem({ ...currentItem, purchaseDate: formattedDate });
    }
  };

  /**
   * Handles selecting a store.
   * 
   * @param {string} selectedStore - The selected store.
   */
  const handleStoreSelect = (selectedStore: string) => {
    if (currentItem) {
      if (selectedStore === "New Store") {
        setIsNewStore(true);
        setCurrentItem({ ...currentItem, store: '' });
      } else {
        setIsNewStore(false);
        setCurrentItem({ ...currentItem, store: selectedStore });
      }
    }
  };

  /**
   * Handles selecting a location.
   * 
   * @param {string} selectedLocation - The selected location.
   */
  const handleLocationSelect = (selectedLocation: string) => {
    if (currentItem) {
      if (selectedLocation === "New Location") {
        setIsNewLocation(true);
        setCurrentItem({ ...currentItem, location: '' });
      } else {
        setIsNewLocation(false);
        setCurrentItem({ ...currentItem, location: selectedLocation });
      }
    }
  };

  /**
   * Validates and sets the price value.
   *
   * @param {string} value - The price input value.
   */
  const handlePriceChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value) && currentItem) {
      setCurrentItem({ ...currentItem, price: parseFloat(value) });
    }
  };

  /**
   * Validates and sets the quantity value.
   *
   * @param {string} value - The quantity input value.
   */
  const handleQuantityChange = (value: string) => {
    if (/^\d*$/.test(value) && currentItem) {
      setCurrentItem({ ...currentItem, quantity: parseInt(value, 10) });
    }
  };

  return {
    currentItem,
    setCurrentItem,
    isNewStore,
    isNewLocation,
    showDatePicker,
    handleAdd,
    handleDiscard,
    handleNext,
    onChangeDate,
    handleStoreSelect,
    handleLocationSelect,
    handlePriceChange,
    handleQuantityChange,
    setShowDatePicker,
    setIsNewStore,
    setIsNewLocation,
    isFormValid,
  };
};

export default useReviewOCRModal;


