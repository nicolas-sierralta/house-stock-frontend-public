import { useState, useEffect } from 'react';
import { InventoryItem } from '../types/types';

/**
 * Parses a date string in either "DD/MM/YYYY" or "YYYY-MM-DD" format into a Date object.
 *
 * @param {string} dateString - The date string to parse.
 * @returns {Date} - The parsed Date object.
 */
const parseDate = (dateString: string): Date => {
  let [day, month, year] = [0, 0, 0];

  if (dateString.includes('/')) {
    [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
  } else if (dateString.includes('-')) {
    [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
  }

  return new Date(year, month - 1, day);
};

/**
 * Custom hook for handling sorting of inventory data.
 *
 * @param {InventoryItem[]} originalData - The original inventory data to be sorted.
 * @returns {Object} - Returns an object with the sorted data, sorting options, and functions for handling sorting.
 */
const useSorting = (originalData: InventoryItem[]) => {
  const [filteredData, setFilteredData] = useState<InventoryItem[]>(originalData);
  const [sortOption, setSortOption] = useState<string>('name');
  const [sortDescending, setSortDescending] = useState<boolean>(false);

  useEffect(() => {
    setFilteredData(originalData);
  }, [originalData]);

  /**
   * Sorts the inventory data based on the selected sorting option.
   *
   * @param {string} option - The sorting option to use.
   */
  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedData = [...filteredData];
    switch (option) {
      case 'name':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case 'quantity':
        sortedData.sort((a, b) => a.quantity - b.quantity);
        break;
      case 'purchaseDate':
        sortedData.sort((a, b) => {
          const dateA = parseDate(a.purchaseDate).getTime();
          const dateB = parseDate(b.purchaseDate).getTime();
          return dateA - dateB;
        });
        break;
      default:
        break;
    }
    if (sortDescending) {
      sortedData.reverse();
    }
    setFilteredData(sortedData);
  };

  /**
   * Toggles the sort order between ascending and descending.
   */
  const toggleSortOrder = () => {
    setSortDescending(!sortDescending);
    handleSort(sortOption);
  };

  return {
    filteredData,
    setFilteredData,
    sortOption,
    sortDescending,
    handleSort,
    toggleSortOrder,
  };
};

export default useSorting;






