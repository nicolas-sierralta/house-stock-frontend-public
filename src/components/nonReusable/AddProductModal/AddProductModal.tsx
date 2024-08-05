import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ModalContainer,
  ModalContent,
  Header,
  Title,
  CloseButton,
  CloseButtonText,
  Label,
  BubblesContainer,
  Bubble,
  BubbleText,
  ButtonContainer
} from './AddProductModal.styles';
import Input from '../../reusable/TextInput/TextInput';
import DateInput from '../../reusable/DateInput/DateInput';
import { AddProductModalProps } from './AddProductModal.types';
import useAddProductForm from '../../../hooks/useAddProductForm';

/**
 * AddProductModal component allows users to add a new product with details such as name, quantity, price, purchase date, store, and location.
 *
 * 
 * @param {AddProductModalProps} props - The props for the AddProductModal component.
 * @returns {JSX.Element} The rendered AddProductModal component.
 */
const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onClose,
  onAdd,
  existingLocations,
  existingShops,
}) => {
  const {
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
    handleAdd,
    onChangeDate,
    handleStoreSelect,
    handleLocationSelect,
    isFormValid,
  } = useAddProductForm(existingShops, existingLocations, visible);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <Header>
            <Title>Add Product</Title>
            <CloseButton onPress={onClose}>
              <CloseButtonText>×</CloseButtonText>
            </CloseButton>
          </Header>
          <ScrollView>
            <Label>Name</Label>
            <Input placeholder="Tomato" value={name} onChangeText={setName} />
            <Label>Quantity</Label>
            <Input
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
            />
            <Label>Price</Label>
            <Input
              placeholder="Enter amount"
              value={price}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
            />
            <Label>Purchase Date</Label>
            <DateInput onPress={() => setShowDatePicker(true)} dateOfBirth={purchaseDate ? purchaseDate : 'Select Date'} />
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <Label>Store</Label>
            <BubblesContainer>
              {existingShops.map((shop) => (
                <Bubble key={shop} selected={store === shop} onPress={() => handleStoreSelect(shop)}>
                  <BubbleText selected={store === shop}>{shop}</BubbleText>
                </Bubble>
              ))}
              <Bubble selected={isNewStore} onPress={() => handleStoreSelect("New Store")}>
                <BubbleText selected={isNewStore}>New Store</BubbleText>
              </Bubble>
            </BubblesContainer>
            {isNewStore && (
              <Input placeholder="Enter new store" value={newStore} onChangeText={setNewStore} />
            )}
            <Label>Location</Label>
            <BubblesContainer>
              {existingLocations.map((loc) => (
                <Bubble key={loc} selected={location === loc} onPress={() => handleLocationSelect(loc)}>
                  <BubbleText selected={location === loc}>{loc}</BubbleText>
                </Bubble>
              ))}
              <Bubble selected={isNewLocation} onPress={() => handleLocationSelect("New Location")}>
                <BubbleText selected={isNewLocation}>New Location</BubbleText>
              </Bubble>
            </BubblesContainer>
            {isNewLocation && (
              <Input placeholder="Enter new location" value={newLocation} onChangeText={setNewLocation} />
            )}
          </ScrollView>
          <ButtonContainer>
            <TouchableOpacity onPress={() => handleAdd(onAdd, onClose)} style={{ backgroundColor: isFormValid ? '#2f27ce' : '#b0b0b0', padding: 10, borderRadius: 5, alignItems: 'center', margin: 5, width: '48%' }} disabled={!isFormValid}>
              <Text style={{ color: '#fbfbfe' }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 5, alignItems: 'center', margin: 5, borderColor: '#2f27ce', borderWidth: 1, width: '48%' }}>
              <Text style={{ color: '#2f27ce' }}>Cancel</Text>
            </TouchableOpacity>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default AddProductModal;