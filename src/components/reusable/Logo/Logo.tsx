import React from 'react';
import { Image } from 'react-native';
import { LogoProps } from './Logo.types';
import styles from './Logo.styles';

/**
 * Logo component displays an image logo.
 
 * @returns {JSX.Element} The rendered Logo component.
 */
const Logo: React.FC<LogoProps> = ({ source }) => {
  return <Image source={source} style={styles.logo} testID="logo-image" />;
};

export default Logo;
