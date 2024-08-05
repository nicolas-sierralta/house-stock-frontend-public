import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MenuContainer, Header, HeaderText, MenuItem, MenuItemText, modalStyles } from './SideMenu.styles';
import { SideMenuProps } from './SideMenu.types';
import useSideMenu from '../../../hooks/useSideMenu';

/**
 * SideMenu component displays a side menu with navigation options and a logout button.
 *
 * 
 * @param {SideMenuProps} props - The props for the SideMenu component.
 * @returns {JSX.Element} The rendered SideMenu component.
 */
const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, navigation }) => {
  const { isSelected, handleLogout } = useSideMenu(navigation, onClose);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="left"
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={modalStyles.modal}
    >
      <View style={modalStyles.innerContainer}>
        <MenuContainer>
          <Header>
            <HeaderText>House Stock</HeaderText>
          </Header>
          <MenuItem selected={isSelected('Profile')} onPress={() => { navigation.navigate('Profile'); onClose(); }}>
            <Icon name="account-circle-outline" size={24} color={isSelected('Profile') ? '#2F80ED' : '#050315'} />
            <MenuItemText selected={isSelected('Profile')}>Profile</MenuItemText>
          </MenuItem>
          <MenuItem selected={isSelected('Inventory')} onPress={() => { navigation.navigate('Inventory'); onClose(); }}>
            <Icon name="clipboard-list-outline" size={24} color={isSelected('Inventory') ? '#2F80ED' : '#050315'} />
            <MenuItemText selected={isSelected('Inventory')}>Inventory</MenuItemText>
          </MenuItem>
          <MenuItem selected={isSelected('ShoppingList')} onPress={() => { navigation.navigate('Inventory'); onClose(); }}>
            <Icon name="cart-outline" size={24} color={isSelected('ShoppingList') ? '#2F80ED' : '#050315'} />
            <MenuItemText selected={isSelected('ShoppingList')}>
              Shopping List
              {'\n'}
              (In progress)
            </MenuItemText>
          </MenuItem>
          <MenuItem selected={isSelected('CalculateMonthlyExpense')} onPress={() => { navigation.navigate('Inventory'); onClose(); }}>
            <Icon name="currency-usd" size={24} color={isSelected('CalculateMonthlyExpense') ? '#2F80ED' : '#050315'} />
            <MenuItemText selected={isSelected('CalculateMonthlyExpense')}>
              Calculate Monthly Expense
              {'\n'}
              (In progress)
            </MenuItemText>
          </MenuItem>
          <MenuItem selected={isSelected('Settings')} onPress={() => { navigation.navigate('Inventory'); onClose(); }}>
            <Icon name="cog-outline" size={24} color={isSelected('Settings') ? '#2F80ED' : '#050315'} />
            <MenuItemText selected={isSelected('Settings')}>
              Settings
              {'\n'}
              (In progress)
            </MenuItemText>
          </MenuItem>
          <MenuItem selected={isSelected('Logout')} onPress={handleLogout}>
            <Icon name="logout" size={24} color={isSelected('Logout') ? '#2F80ED' : '#050315'} />
            <MenuItemText selected={isSelected('Logout')}>Logout</MenuItemText>
          </MenuItem>
        </MenuContainer>
      </View>
    </Modal>
  );
};

export default SideMenu;
