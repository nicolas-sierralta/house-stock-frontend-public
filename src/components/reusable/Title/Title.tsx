import React from 'react';
import { Text } from 'react-native';
import { TitleProps } from './Title.types';
import styles from './Title.styles';

/**
 * Title component displays a styled text as a title.
 *
 * 
 * @param {TitleProps} props - The props for the Title component.
 * @returns {JSX.Element} The rendered Title component.
 */
const Title: React.FC<TitleProps> = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

export default Title;
