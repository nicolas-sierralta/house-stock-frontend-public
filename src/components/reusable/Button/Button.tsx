import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ButtonProps } from './Button.types';
import styles from './Button.styles';

/**
 * Button component.
 *
 * @param {ButtonProps} props - Props for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button: React.FC<ButtonProps> = ({ onPress, text, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
