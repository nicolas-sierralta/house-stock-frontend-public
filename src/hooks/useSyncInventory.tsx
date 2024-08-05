import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

/**
 * Custom hook to handle syncing of inventory data with the backend when the app goes into the background or loses network connection.
 *
 * @param {string | null} token - The authentication token for API requests.
 * @returns {Object} - An object containing functions to sync local changes and to logout with syncing.
 */
const useSyncInventory = (token: string | null) => {
  const { logout, email } = useAuth();

  /**
   * Syncs local changes with the backend server.
   */
  const syncLocalChanges = async () => {
    const localChanges = await AsyncStorage.getItem('localChanges');
    if (localChanges) {
      try {
        const changes = JSON.parse(localChanges);
        console.log(changes);
        const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Use the environment variable for the API URL
        if (!apiUrl) {
          throw new Error('API URL is not defined');
        }

        await axios.post(`${apiUrl}/products/syncInventory`, { changes, userId: email }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await AsyncStorage.removeItem('localChanges');
      } catch (error) {
        const err = error as AxiosError;
        console.error('Error synchronizing local changes:', err);
      }
    }
  };

  /**
   * Clears local data from AsyncStorage.
   */
  const clearLocalData = async () => {
    await AsyncStorage.removeItem('inventoryData');
    await AsyncStorage.removeItem('token');
  };

  /**
   * Handles app state changes to sync local changes and clear data when the app goes to background or inactive state.
   * 
   * @param {AppStateStatus} nextAppState - The next app state.
   */
  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState.match(/inactive|background/)) {
      await syncLocalChanges();
      await clearLocalData();
    }
  };

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncLocalChanges().catch(error => console.error('Error syncing local changes:', error));
      }
    });

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      unsubscribeNetInfo();
      appStateSubscription.remove();
    };
  }, [token]);

  /**
   * Logs out the user after syncing local changes and clearing local data.
   */
  const logoutWithSync = async () => {
    await syncLocalChanges();
    await clearLocalData();
    console.log("Logout sync")
    logout();
  };

  return { syncLocalChanges, logoutWithSync };
};

export default useSyncInventory;

