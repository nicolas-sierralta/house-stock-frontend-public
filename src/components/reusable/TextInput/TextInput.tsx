import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';
import styles from './TextInput.styles';

interface TextInputProps extends RNTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

/**
 * TextInput component is a custom wrapper around the React Native TextInput component.
 *
 * 
 * @param {TextInputProps} props - The props for the TextInput component.
 * @returns {JSX.Element} The rendered TextInput component.
 */
const TextInput: React.FC<TextInputProps> = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', ...props }) => {
  return (
    <RNTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={styles.textInput}
      {...props}
    />
  );
};

export default TextInput;

