import React from 'react';
import { Modal, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FilterModalProps } from './FilterModal.types';
import useFilterModal from '../../../hooks/useFilterModal';
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
  StyledDateInput,
  DateInputText,
  ButtonContainer,
  Button,
  ButtonText,
  StyledMultiSlider
} from './FilterModal.styles';

/**
 * FilterModal component allows users to apply filters to the inventory data based on various criteria such as name, store, quantity, location, and date range.
 *
 * 
 * @param {FilterModalProps} props - The props for the FilterModal component.
 * @returns {JSX.Element} The rendered FilterModal component.
 */
const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
  originalData,
  maxQuantity,
}) => {
  const {
    name,
    setName,
    store,
    setStore,
    quantityRange,
    setQuantityRange,
    location,
    setLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showStartDatePicker,
    setShowStartDatePicker,
    showEndDatePicker,
    setShowEndDatePicker,
    handleApplyFilters,
  } = useFilterModal(originalData, maxQuantity);

  const existingShops = Array.from(new Set(originalData.map((item) => item.store)));
  const existingLocations = Array.from(new Set(originalData.map((item) => item.location)));

  const applyFilters = () => {
    const filters = {
      name,
      store: store === 'All Stores' ? '' : store,
      quantityRange,
      location: location === 'All Locations' ? '' : location,
      startDate,
      endDate,
    };
    handleApplyFilters(filters);
    onApplyFilters(filters);
    onClose();
  };

  const resetFilters = () => {
    setName('');
    setStore('All Stores');
    setQuantityRange([1, maxQuantity]);
    setLocation('All Locations');
    setStartDate(null);
    setEndDate(null);
    onApplyFilters({});
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <Header>
            <Title>Filter Inventory</Title>
            <CloseButton onPress={onClose}>
              <CloseButtonText>×</CloseButtonText>
            </CloseButton>
          </Header>
          <ScrollView>
            <Label>Name</Label>
            <Input placeholder="Name" value={name} onChangeText={setName} placeholderTextColor="#dedcff" />
            <Label>Store</Label>
            <BubblesContainer>
              <Bubble selected={store === 'All Stores'} onPress={() => setStore('All Stores')}>
                <BubbleText selected={store === 'All Stores'}>All Stores</BubbleText>
              </Bubble>
              {existingShops.map((shop) => (
                <Bubble key={shop} selected={store === shop} onPress={() => setStore(shop)}>
                  <BubbleText selected={store === shop}>{shop}</BubbleText>
                </Bubble>
              ))}
            </BubblesContainer>
            <Label>Quantity: {quantityRange[0]} - {quantityRange[1]}</Label>
            <StyledMultiSlider
              values={[quantityRange[0], quantityRange[1]]}
              min={1}
              max={maxQuantity}
              step={1}
              onValuesChange={(values) => setQuantityRange(values as [number, number])}
            />
            <Label>Location</Label>
            <BubblesContainer>
              <Bubble selected={location === 'All Locations'} onPress={() => setLocation('All Locations')}>
                <BubbleText selected={location === 'All Locations'}>All Locations</BubbleText>
              </Bubble>
              {existingLocations.map((loc) => (
                <Bubble key={loc} selected={location === loc} onPress={() => setLocation(loc)}>
                  <BubbleText selected={location === loc}>{loc}</BubbleText>
                </Bubble>
              ))}
            </BubblesContainer>
            <Label>Date Range</Label>
            <DateInputContainer>
              <StyledDateInput onPress={() => setShowStartDatePicker(true)}>
                <DateInputText>{startDate ? startDate.toLocaleDateString() : 'Start Date'}</DateInputText>
                <Icon name="calendar" size={20} color="#050315" />
              </StyledDateInput>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowStartDatePicker(false);
                    setStartDate(date ?? null);
                  }}
                />
              )}
              <StyledDateInput onPress={() => setShowEndDatePicker(true)}>
                <DateInputText>{endDate ? endDate.toLocaleDateString() : 'End Date'}</DateInputText>
                <Icon name="calendar" size={20} color="#050315" />
              </StyledDateInput>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowEndDatePicker(false);
                    setEndDate(date ?? null);
                  }}
                />
              )}
            </DateInputContainer>
          </ScrollView>
          <ButtonContainer>
            <Button onPress={applyFilters}>
              <ButtonText>Apply</ButtonText>
            </Button>
            <Button onPress={resetFilters}>
              <ButtonText>Reset</ButtonText>
            </Button>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default FilterModal;