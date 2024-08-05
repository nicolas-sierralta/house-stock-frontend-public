import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/types';

/**
 * Custom hook for managing user profile data and related actions.
 * 
 * @returns {Object} - Returns user data, states for date picker, password modal, side menu visibility, and functions to handle save changes, change password, and modal toggles.
 */
const useProfile = () => {
  const { token, email } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [initialUserData, setInitialUserData] = useState<User | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Use the environment variable for the API URL
        if (!apiUrl) {
          throw new Error('API URL is not defined');
        }

        const response = await fetch(`${apiUrl}/user/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: User = await response.json();
        const formattedDate = data.dateOfBirth ? formatDate(data.dateOfBirth) : '';
        const formattedData = { ...data, dateOfBirth: formattedDate };
        setUserData(formattedData);
        setInitialUserData(formattedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Error fetching user data');
      }
    };

    if (token && email) {
      fetchUserData();
    }
  }, [token, email]);

  useEffect(() => {
    if (userData && initialUserData) {
      setHasChanges(
        userData.fullName !== initialUserData.fullName || 
        userData.dateOfBirth !== initialUserData.dateOfBirth
      );
    }
  }, [userData, initialUserData]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const convertDateForSave = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const validateFullName = (fullName: string) => {
    const regex = /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/;
    return regex.test(fullName);
  };

  const handleSaveChanges = async () => {
    if (userData && !validateFullName(userData.fullName)) {
      Alert.alert('Error', 'Full name must contain at least 3 letters, a space, and 3 more letters.');
      return;
    }

    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Use the environment variable for the API URL
      if (!apiUrl) {
        throw new Error('API URL is not defined');
      }

      const dateOfBirthForSave = userData?.dateOfBirth ? convertDateForSave(userData.dateOfBirth) : null;

      const response = await fetch(`${apiUrl}/user/${email}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: userData?.fullName,
          dateOfBirth: dateOfBirthForSave,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setInitialUserData(userData);
      setHasChanges(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const validatePassword = (password: string) => {
    const hasSixCharacters = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasSixCharacters && hasLetter && hasNumber;
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert('Error', 'Password must be at least 6 characters long and contain at least one letter and one number');
      return;
    }

    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Use the environment variable for the API URL
      if (!apiUrl) {
        throw new Error('API URL is not defined');
      }

      const response = await fetch(`${apiUrl}/user/changePassword`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData?.email,
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      setPasswordModalVisible(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      Alert.alert('Success', 'Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggleSideMenu = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  return {
    userData,
    setUserData,
    datePickerVisible,
    setDatePickerVisible,
    passwordModalVisible,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    sideMenuVisible,
    handleSaveChanges,
    handleChangePassword,
    openPasswordModal,
    closePasswordModal,
    toggleSideMenu,
    hasChanges,
  };
};

export default useProfile;

