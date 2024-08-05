import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SideMenu from '../../reusable/SideMenu/SideMenu';
import { HeaderContainer, Title, Button } from './HeaderInventory.styles';
import { HeaderProps } from './HeaderInventory.types';

/**
 * HeaderInventory component renders a header with a title, menu button, and a toggle view button.
 *
 * 
 * @param {HeaderProps} props - The props for the HeaderInventory component.
 * @returns {JSX.Element} The rendered HeaderInventory component.
 */
const HeaderInventory: React.FC<HeaderProps> = ({ title, toggleView, detailedView }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <>
      <HeaderContainer>
        <Button testID="menu-button" onPress={() => setMenuVisible(true)}>
          <Icon name="menu" size={30} color="#050315" />
        </Button>
        <Title>{title}</Title>
        <Button testID="toggle-view-button" onPress={toggleView}>
          <Icon
            name={detailedView ? "view-list" : "view-module"}
            size={32}
            color="#050315"
          />
        </Button>
      </HeaderContainer>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
    </>
  );
};

export default HeaderInventory;