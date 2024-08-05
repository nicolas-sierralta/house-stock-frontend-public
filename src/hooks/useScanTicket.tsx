import React, { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { InventoryItem } from '../types/types';
import { format } from 'date-fns';

/**
 * Custom hook to manage the process of scanning a ticket using the device's camera or image library.
 *
 * @param {boolean} visible - A boolean indicating if the modal for scanning is visible.
 * @param {string | null} token - The authentication token for making API requests.
 * @param {Function} onScan - A callback function to handle the scanned results.
 * 
 * @returns {Object} - Returns an object with the current state and functions for handling image selection, capture, and scanning.
 */
const useScanTicket = (
  visible: boolean, 
  token: string | null, 
  onScan: (result: InventoryItem[]) => void
) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);

  useEffect(() => {
    if (visible) {
      setImageUri(null);
      setScanResult(null);
    }
  }, [visible]);

  useEffect(() => {
    if (scanResult && scanResult.items) {
      const formattedResult = scanResult.items.map((item: any) => ({
        id: '',
        name: item.name,
        quantity: item.quantity,
        price: item.price || 0,
        purchaseDate: format(new Date(scanResult.date), 'dd/MM/yyyy'),
        store: scanResult.merchantName,
        location: '',
      }));
      onScan(formattedResult);
    }
  }, [scanResult, onScan]);

  /**
   * Requests the necessary permissions for accessing the camera and media library.
   * 
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if permissions were granted.
   */
  const requestPermissions = async (): Promise<boolean> => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Camera and media library permissions are required.');
      return false;
    }
    return true;
  };

  /**
   * Handles selecting an image from the device's image library.
   */
  const handleSelectImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri);
    }
  };

  /**
   * Handles capturing an image using the device's camera.
   */
  const handleCaptureImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri);
    }
  };

  /**
   * Handles scanning the selected or captured image.
   */
  const handleScanImage = async () => {
    if (!imageUri || !token) {
      return;
    }

    setScanning(true);
    setScanResult(null);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Use the environment variable for the API URL
    if (!apiUrl) {
      Alert.alert('Error', 'API URL is not defined');
      setScanning(false);
      return;
    }

    const maxRetries = 3;
    const retryDelay = 2000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const formData = new FormData();
        formData.append('ticket', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'ticket.jpg',
        } as unknown as Blob);

        const serverResponse = await fetch(`${apiUrl}/ocr/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!serverResponse.ok) {
          throw new Error(`Server responded with ${serverResponse.status}`);
        }

        const responseData = await serverResponse.json();
        setScanResult(responseData);
        break;
      } catch (err) {
        const error = err as Error;
        if (attempt < maxRetries) {
          await new Promise(res => setTimeout(res, retryDelay));
        } else {
          Alert.alert('Error', `There was an error processing the image after ${maxRetries} attempts: ${error.message}`);
        }
      } finally {
        setScanning(false);
      }
    }
  };

  return {
    imageUri,
    scanning,
    scanResult,
    handleSelectImage,
    handleCaptureImage,
    handleScanImage,
  };
};

export default useScanTicket;














