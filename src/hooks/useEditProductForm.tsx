import { useState, useEffect } from "react";
import { InventoryItem } from '../types/types';

/**
 * Custom hook for managing the form state and logic for editing a product.
 *
 * @param {InventoryItem} item - The item to be edited.
 * @param {string[]} existingShops - List of existing shops.
 * @param {string[]} existingLocations - List of existing locations.
 * @returns {object} The state and handlers for the edit product form.
 */
const useEditProductForm = (item: InventoryItem, existingShops: string[], existingLocations: string[]) => {

  /**
   * Formats the date to DD/MM/YYYY.
   *
   * @param {Date | string} date - The date to format.
   * @returns {string} The formatted date.
   */
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Formats the date to YYYY-MM-DD for saving.
   *
   * @param {string} date - The date to format.
   * @returns {string} The formatted date.
   */
  const formatDateForSave = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [price, setPrice] = useState(item.price.toString());
  const [purchaseDate, setPurchaseDate] = useState(formatDate(item.purchaseDate));
  const [store, setStore] = useState(item.store);
  const [location, setLocation] = useState(item.location);
  const [newStore, setNewStore] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isNewStore, setIsNewStore] = useState(false);
  const [isNewLocation, setIsNewLocation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setName(item.name);
    setQuantity(item.quantity.toString());
    setPrice(item.price.toString());
    setPurchaseDate(formatDate(item.purchaseDate));
    setStore(item.store);
    setLocation(item.location);
    setNewStore("");
    setNewLocation("");
    setIsNewStore(false);
    setIsNewLocation(false);
  }, [item]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [name, quantity, price, purchaseDate, store, location, newStore, newLocation, isNewStore, isNewLocation]);

  /**
   * Validates the form fields.
   *
   * @returns {boolean} True if all fields are filled, otherwise false.
   */
  const validateForm = () => {
    return (
      name.trim() !== '' &&
      quantity.trim() !== '' &&
      price.trim() !== '' &&
      purchaseDate.trim() !== '' &&
      (isNewStore ? newStore.trim() !== '' : store.trim() !== '') &&
      (isNewLocation ? newLocation.trim() !== '' : location.trim() !== '')
    );
  };

  /**
   * Handles saving the changes made to the product.
   *
   * @param {function} onSave - Callback to save the updated item.
   * @param {function} onClose - Callback to close the modal.
   */
  const handleSaveChanges = (onSave: (item: InventoryItem) => void, onClose: () => void) => {
    if (!isFormValid) return;

    const finalLocation = isNewLocation ? newLocation : location;
    const finalStore = isNewStore ? newStore : store;
    const updatedItem: InventoryItem = {
      ...item,
      name,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      purchaseDate: formatDateForSave(purchaseDate),
      store: finalStore,
      location: finalLocation,
    };
    onSave(updatedItem);
    onClose();
  };

  /**
   * Handles the change of the purchase date.
   *
   * @param {object} event - The event object from the date picker.
   * @param {Date} selectedDate - The selected date.
   */
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setPurchaseDate(formattedDate);
    }
  };

  /**
   * Handles the selection of a store.
   *
   * @param {string} selectedStore - The selected store.
   */
  const handleStoreSelect = (selectedStore: string) => {
    if (selectedStore === "New Store") {
      setIsNewStore(true);
      setStore("");
    } else {
      setIsNewStore(false);
      setStore(selectedStore);
    }
  };

  /**
   * Handles the selection of a location.
   *
   * @param {string} selectedLocation - The selected location.
   */
  const handleLocationSelect = (selectedLocation: string) => {
    if (selectedLocation === "New Location") {
      setIsNewLocation(true);
      setLocation("");
    } else {
      setIsNewLocation(false);
      setLocation(selectedLocation);
    }
  };

  /**
   * Validates and sets the price value.
   *
   * @param {string} value - The price input value.
   */
  const handlePriceChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  /**
   * Validates and sets the quantity value.
   *
   * @param {string} value - The quantity input value.
   */
  const handleQuantityChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  return {
    name,
    setName,
    quantity,
    handleQuantityChange,
    price,
    handlePriceChange,
    purchaseDate,
    store,
    location,
    newStore,
    setNewStore,
    newLocation,
    setNewLocation,
    showDatePicker,
    setShowDatePicker,
    isNewStore,
    isNewLocation,
    handleSaveChanges,
    onChangeDate,
    handleStoreSelect,
    handleLocationSelect,
    isFormValid,
  };
};

export default useEditProductForm;

