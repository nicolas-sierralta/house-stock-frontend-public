import React from 'react';
import { Modal, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ModalContainer,
  ModalContent,
  Header,
  Title,
  CloseButton,
  CloseButtonText,
  Label,
  Input,
  BubblesContainer,
  Bubble,
  BubbleText,
  DateInputContainer,
  DateInputText,
  ButtonContainer,
  Button,
  ButtonText,
} from './ReviewOCRModal.styles';
import { ReviewOCRModalProps } from './ReviewOCRModal.types';
import useReviewOCRModal from '../../../hooks/useReviewOCRModal';

/**
 * ReviewOCRModal component allows users to review and edit OCR data before adding it to the inventory.
 *
 */
const ReviewOCRModal: React.FC<ReviewOCRModalProps> = ({
  visible,
  onClose,
  onAdd,
  onCancel,
  ocrData,
  existingLocations,
  existingShops,
}) => {
  const {
    currentItem,
    setCurrentItem,
    isNewStore,
    isNewLocation,
    showDatePicker,
    handleAdd,
    handleDiscard,
    onChangeDate,
    handleStoreSelect,
    handleLocationSelect,
    handlePriceChange,
    handleQuantityChange,
    setShowDatePicker,
    isFormValid,
  } = useReviewOCRModal(ocrData, onAdd, onClose);

  if (!currentItem) {
    return null; // or a loading indicator, or an empty fragment, etc.
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <Header>
            <Title>Review OCR Data</Title>
            <CloseButton onPress={onCancel}>
              <CloseButtonText>×</CloseButtonText>
            </CloseButton>
          </Header>
          <ScrollView>
            <Label>Name</Label>
            <Input placeholder="Product Name" value={currentItem.name} onChangeText={(text) => setCurrentItem({ ...currentItem, name: text })} />
            <Label>Quantity</Label>
            <Input
              placeholder="Enter quantity"
              value={String(currentItem.quantity)}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
            />
            <Label>Price</Label>
            <Input
              placeholder="Enter amount"
              value={String(currentItem.price)}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
            />
            <Label>Purchase Date</Label>
            <DateInputContainer onPress={() => setShowDatePicker(true)}>
              <DateInputText>{currentItem.purchaseDate ? currentItem.purchaseDate : 'Select Date'}</DateInputText>
            </DateInputContainer>
            {showDatePicker && (
              <DateTimePicker
                value={new Date(currentItem.purchaseDate.split('/').reverse().join('-'))}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <Label>Store</Label>
            <BubblesContainer>
              {existingShops.map((shop) => (
                <Bubble key={shop} selected={currentItem.store === shop} onPress={() => handleStoreSelect(shop)}>
                  <BubbleText selected={currentItem.store === shop}>{shop}</BubbleText>
                </Bubble>
              ))}
              <Bubble selected={isNewStore} onPress={() => handleStoreSelect("New Store")}>
                <BubbleText selected={isNewStore}>New Store</BubbleText>
              </Bubble>
            </BubblesContainer>
            {isNewStore && (
              <Input placeholder="Enter new store" value={currentItem.store} onChangeText={(text) => setCurrentItem({ ...currentItem, store: text })} />
            )}
            <Label>Location</Label>
            <BubblesContainer>
              {existingLocations.map((loc) => (
                <Bubble key={loc} selected={currentItem.location === loc} onPress={() => handleLocationSelect(loc)}>
                  <BubbleText selected={currentItem.location === loc}>{loc}</BubbleText>
                </Bubble>
              ))}
              <Bubble selected={isNewLocation} onPress={() => handleLocationSelect("New Location")}>
                <BubbleText selected={isNewLocation}>New Location</BubbleText>
              </Bubble>
            </BubblesContainer>
            {isNewLocation && (
              <Input placeholder="Enter new location" value={currentItem.location} onChangeText={(text) => setCurrentItem({ ...currentItem, location: text })} />
            )}
          </ScrollView>
          <ButtonContainer>
            <Button 
              primary 
              onPress={handleAdd} 
              disabled={!isFormValid} 
              style={{ backgroundColor: isFormValid ? '#2f27ce' : '#b0b0b0' }}
            >
              <ButtonText primary>Add</ButtonText>
            </Button>
            <Button onPress={handleDiscard}>
              <ButtonText>Discard</ButtonText>
            </Button>
            <Button onPress={onCancel}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default ReviewOCRModal;