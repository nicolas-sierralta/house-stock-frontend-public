import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { InventoryItem } from '../types/types';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Custom hook for fetching inventory data from the server and storing it locally.
 *
 * @returns {object} The inventory data, loading state, and a function to set inventory data.
 */
const useFetchInventory = () => {
  const { token } = useAuth();
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches inventory data from the server and updates the state and local storage.
     */
    const fetchInventory = async () => {
      try {
        if (token) {
          const apiUrl = process.env.EXPO_PUBLIC_API_URL; 
          const response = await axios.get(`${apiUrl}/products/getAllProducts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const formattedData = response.data.map((item: any) => ({
            ...item,
            purchaseDate: item.purchaseDate,
            price: parseFloat(item.price),
          }));
          setInventoryData(formattedData);
          await AsyncStorage.setItem('inventoryData', JSON.stringify(formattedData));
        } else {
          console.log('No token found');
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error('Error fetching inventory data:', error);
        if (error.response) {
          console.error('Response error:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Unknown error:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    /**
     * Loads inventory data from local storage if available.
     */
    const loadLocalInventory = async () => {
      const localData = await AsyncStorage.getItem('inventoryData');
      if (localData) {
        setInventoryData(JSON.parse(localData));
      }
    };

    loadLocalInventory();
    fetchInventory();
  }, [token]);

  return { inventoryData, loading, setInventoryData };
};

export default useFetchInventory;
