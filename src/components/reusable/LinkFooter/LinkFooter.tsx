import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './LinkFooter.styles';
import { LinkFooterProps, RootStackParamList } from './LinkFooter.types';

/**
 * LinkFooter component displays a footer with a text message and a link that navigates to a specified route.
 *
 * @param {LinkFooterProps} props - The props for the LinkFooter component.
 * @returns {JSX.Element} The rendered LinkFooter component.
 */
const LinkFooter: React.FC<LinkFooterProps> = ({ text, linkText, linkRoute }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{text}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(linkRoute)}>
        <Text style={styles.footerLinkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkFooter;


