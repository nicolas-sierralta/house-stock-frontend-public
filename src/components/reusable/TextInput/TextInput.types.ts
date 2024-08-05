import { TextInputProps as RNTextInputProps } from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}
