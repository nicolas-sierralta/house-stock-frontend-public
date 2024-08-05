import React from "react";
import { Modal, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../reusable/TextInput/TextInput';
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
  DateInputContainer,
  DateInputText,
  ButtonContainer,
  StyledButton,
  ButtonText,
} from './EditProductModal.styles';
import { EditProductModalProps } from './EditProductModal.types';
import useEditProductForm from '../../../hooks/useEditProductForm';

/**
 * EditProductModal component allows users to edit an existing product with details such as name, quantity, price, purchase date, store, and location.
 *
 * 
 * @param {EditProductModalProps} props - The props for the EditProductModal component.
 * @returns {JSX.Element} The rendered EditProductModal component.
 */
const EditProductModal: React.FC<EditProductModalProps> = ({
  visible,
  onClose,
  onSave,
  existingLocations,
  existingShops,
  item,
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
    handleSaveChanges,
    onChangeDate,
    handleStoreSelect,
    handleLocationSelect,
    isFormValid,
  } = useEditProductForm(item, existingShops, existingLocations);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <Header>
            <Title>Edit Product</Title>
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
            <DateInputContainer onPress={() => setShowDatePicker(true)}>
              <DateInputText>{purchaseDate ? purchaseDate : 'Select Date'}</DateInputText>
              <Icon name="calendar" size={20} color="#050315" />
            </DateInputContainer>
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
            <StyledButton 
              primary 
              onPress={() => handleSaveChanges(onSave, onClose)} 
              disabled={!isFormValid} 
              style={{ backgroundColor: isFormValid ? '#2f27ce' : '#b0b0b0' }}
            >
              <ButtonText primary>Save</ButtonText>
            </StyledButton>
            <StyledButton onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </StyledButton>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default EditProductModal;

