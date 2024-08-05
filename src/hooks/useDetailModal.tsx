import { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Custom hook for managing the animation and date formatting for a detail modal.
 *
 * @param {boolean} visible - Determines whether the modal is visible or not.
 * @returns {object} The animation state and date formatting function.
 */
const useDetailModal = (visible: boolean) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, scaleAnim]);

  /**
   * Formats a date string into DD/MM/YYYY format.
   *
   * @param {string} dateString - The date string to format.
   * @returns {string} The formatted date string.
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return { scaleAnim, formatDate };
};

export default useDetailModal;

