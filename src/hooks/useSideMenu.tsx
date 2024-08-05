import { NavigationProp, ParamListBase, useRoute, RouteProp } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

/**
 * Custom hook for handling the side menu actions, including route selection and logout.
 *
 * @param {NavigationProp<ParamListBase>} navigation - The navigation prop to control the navigation.
 * @param {Function} onClose - The function to call when the side menu is closed.
 * 
 * @returns {Object} - Returns an object with the current state and functions for handling menu actions.
 */
const useSideMenu = (
  navigation: NavigationProp<ParamListBase>, 
  onClose: () => void
) => {
  const route = useRoute<RouteProp<Record<string, object | undefined>>>();
  const { logout } = useAuth();

  /**
   * Checks if the given route name matches the current route name.
   * 
   * @param {string} routeName - The name of the route to check.
   * @returns {boolean} - Returns true if the given route name matches the current route name, otherwise false.
   */
  const isSelected = (routeName: string): boolean => route.name === routeName;

  /**
   * Handles the logout process, including navigation to the Login screen and closing the side menu.
   */
  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
    onClose();
  };

  return {
    isSelected,
    handleLogout
  };
};

export default useSideMenu;

