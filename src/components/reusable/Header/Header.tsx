import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SideMenu from '../SideMenu/SideMenu';
import { HeaderContainer, TitleContainer, Title, Button } from './Header.styles';
import { HeaderCommonProps, RootStackParamList } from './Header.types';

/**
 * Header component that displays a title and a menu button. The menu button opens a side menu.
 *
 * @param {HeaderCommonProps} props - The props for the Header component.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header: React.FC<HeaderCommonProps> = ({ title, toggleView }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <HeaderContainer>
        <Button onPress={() => setMenuVisible(true)}>
          <Icon name="menu" size={30} color="#050315" />
        </Button>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <View style={{ width: 30 }} />
      </HeaderContainer>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
    </>
  );
};

export default Header;

