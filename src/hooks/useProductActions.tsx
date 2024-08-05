import { useState, useEffect } from 'react';
import { InventoryItem } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

/**
 * Custom hook for managing product actions such as editing, deleting, and adding items in the inventory.
 * 
 * @param {InventoryItem[]} inventoryData - The initial inventory data.
 * @param {(data: InventoryItem[]) => void} setInventoryData - Function to update the inventory data state.
 * @returns {Object} - Returns filteredData, handleEditItem, handleDeleteItem, and handleAddItem functions.
 */
const useProductActions = (inventoryData: InventoryItem[], setInventoryData: (data: InventoryItem[]) => void) => {
  const [filteredData, setFilteredData] = useState<InventoryItem[]>(inventoryData);

  useEffect(() => {
    setFilteredData(inventoryData);
  }, [inventoryData]);

  /**
   * Handles the editing of an item in the inventory.
   * 
   * @param {InventoryItem} updatedItem - The updated item to be saved.
   */
  const handleEditItem = async (updatedItem: InventoryItem) => {
    const updatedData = inventoryData.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setInventoryData(updatedData);
    await AsyncStorage.setItem('inventoryData', JSON.stringify(updatedData));

    const localChanges = JSON.parse(await AsyncStorage.getItem('localChanges') || '[]');
    const updatedLocalChanges = localChanges.filter((item: any) => item.id !== updatedItem.id);
    updatedLocalChanges.push({ ...updatedItem, action: 'edit' });
    await AsyncStorage.setItem('localChanges', JSON.stringify(updatedLocalChanges));
  };

  /**
   * Handles the deletion of an item from the inventory.
   * 
   * @param {InventoryItem} itemToDelete - The item to be deleted.
   */
  const handleDeleteItem = async (itemToDelete: InventoryItem) => {
    const updatedData = inventoryData.filter(item => item.id !== itemToDelete.id);
    setInventoryData(updatedData);
    await AsyncStorage.setItem('inventoryData', JSON.stringify(updatedData));

    const localChanges = JSON.parse(await AsyncStorage.getItem('localChanges') || '[]');
    const updatedLocalChanges = localChanges.filter((item: any) => item.id !== itemToDelete.id);
    updatedLocalChanges.push({ id: itemToDelete.id, action: 'delete' });
    await AsyncStorage.setItem('localChanges', JSON.stringify(updatedLocalChanges));
  };

  /**
   * Generates a UUID.
   * 
   * @returns {Promise<string>} - A promise that resolves to a UUID string.
   */
  const generateUUID = async (): Promise<string> => {
    const randomBytes = await Crypto.getRandomBytesAsync(16);
    const hexString = Array.from(randomBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    return `${hexString.substring(0, 8)}-${hexString.substring(8, 12)}-${hexString.substring(12, 16)}-${hexString.substring(16, 20)}-${hexString.substring(20, 32)}`;
  };

  /**
   * Handles the addition of a new item to the inventory.
   * 
   * @param {InventoryItem} newItem - The new item to be added.
   */
  const handleAddItem = async (newItem: InventoryItem) => {
    newItem.id = await generateUUID();
    const updatedData = [newItem, ...inventoryData];
    setInventoryData(updatedData);
    await AsyncStorage.setItem('inventoryData', JSON.stringify(updatedData));

    const localChanges = JSON.parse(await AsyncStorage.getItem('localChanges') || '[]');
    localChanges.push({ ...newItem, action: 'add' });
    await AsyncStorage.setItem('localChanges', JSON.stringify(localChanges));
  };

  return {
    filteredData,
    handleEditItem,
    handleDeleteItem,
    handleAddItem
  };
};

export default useProductActions;