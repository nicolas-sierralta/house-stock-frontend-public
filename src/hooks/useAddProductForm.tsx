import { useState, useEffect } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { InventoryItem } from '../types/types';
import { useAuth } from '../context/AuthContext';

const useAddProductForm = (existingShops: string[], existingLocations: string[], visible: boolean) => {
  const { email } = useAuth();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [store, setStore] = useState(existingShops[0] || '');
  const [location, setLocation] = useState(existingLocations[0] || '');
  const [newStore, setNewStore] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isNewStore, setIsNewStore] = useState(false);
  const [isNewLocation, setIsNewLocation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (visible) {
      resetForm();
    }
  }, [visible]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [name, quantity, price, purchaseDate, store, location, newStore, newLocation, isNewStore, isNewLocation]);

  const resetForm = () => {
    setName('');
    setQuantity('');
    setPrice('');
    setPurchaseDate('');
    setStore(existingShops[0] || '');
    setLocation(existingLocations[0] || '');
    setNewStore('');
    setNewLocation('');
    setIsNewStore(false);
    setIsNewLocation(false);
  };

  const handleAdd = (onAdd: (newItem: InventoryItem) => void, onClose: () => void) => {
    if (!isFormValid || !email) return;

    const finalLocation = isNewLocation ? newLocation : location;
    const finalStore = isNewStore ? newStore : store;
    const formattedDate = formatDateForSave(purchaseDate);

    const newItem: InventoryItem = {
      id: '',
      name,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      purchaseDate: formattedDate,
      store: finalStore,
      location: finalLocation,
      userId: email,
    };
    onAdd(newItem);
    onClose();
  };

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

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setPurchaseDate(formattedDate);
    }
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForSave = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleStoreSelect = (selectedStore: string) => {
    if (selectedStore === "New Store") {
      setIsNewStore(true);
      setStore('');
    } else {
      setIsNewStore(false);
      setStore(selectedStore);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    if (selectedLocation === "New Location") {
      setIsNewLocation(true);
      setLocation('');
    } else {
      setIsNewLocation(false);
      setLocation(selectedLocation);
    }
  };

  const handlePriceChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

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
    setPurchaseDate,
    store,
    setStore,
    location,
    setLocation,
    newStore,
    setNewStore,
    newLocation,
    setNewLocation,
    showDatePicker,
    setShowDatePicker,
    isNewStore,
    setIsNewStore,
    isNewLocation,
    setIsNewLocation,
    handleAdd,
    onChangeDate,
    handleStoreSelect,
    handleLocationSelect,
    isFormValid,
  };
};

export default useAddProductForm;




