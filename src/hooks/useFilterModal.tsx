import { useState, useEffect } from 'react';
import { InventoryItem } from '../types/types';

/**
 * Parses a date string in the format 'YYYY-MM-DD' and returns a Date object.
 * @param {string} dateString - The date string to parse.
 * @returns {Date} The parsed Date object.
 */
const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
  return new Date(year, month - 1, day);
};

/**
 * Custom hook for managing and applying filters to a list of inventory items.
 * 
 * @param {InventoryItem[]} originalData - The original list of inventory items.
 * @param {number} maxQuantity - The maximum quantity of items.
 * @returns {object} The filter state and handlers.
 */
const useFilterModal = (originalData: InventoryItem[], maxQuantity: number) => {
  const [name, setName] = useState('');
  const [store, setStore] = useState('All Stores');
  const [quantityRange, setQuantityRange] = useState<[number, number]>([1, maxQuantity]);
  const [location, setLocation] = useState('All Locations');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    setQuantityRange([1, maxQuantity]);
  }, [maxQuantity]);

  /**
   * Applies the specified filters to the original data.
   * @param {object} filters - The filters to apply.
   * @returns {InventoryItem[]} The filtered list of inventory items.
   */
  const handleApplyFilters = (filters: any): InventoryItem[] => {
    let filtered = [...originalData];

    if (filters.name) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    if (filters.store) {
      filtered = filtered.filter(item => item.store.toLowerCase().includes(filters.store.toLowerCase()));
    }

    if (filters.quantityRange) {
      filtered = filtered.filter(item => item.quantity >= filters.quantityRange[0] && item.quantity <= filters.quantityRange[1]);
    }

    if (filters.location) {
      filtered = filtered.filter(item => item.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.startDate) {
      filtered = filtered.filter(item => {
        const itemDate = parseDate(item.purchaseDate);
        const filterStartDate = filters.startDate;
        return itemDate >= filterStartDate;
      });
    }

    if (filters.endDate) {
      filtered = filtered.filter(item => {
        const itemDate = parseDate(item.purchaseDate);
        const filterEndDate = filters.endDate;
        return itemDate <= filterEndDate;
      });
    }

    return filtered;
  };

  return {
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
  };
};

export default useFilterModal;



