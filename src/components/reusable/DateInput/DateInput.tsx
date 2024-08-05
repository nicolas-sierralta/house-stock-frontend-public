import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './DateInput.styles';

interface DateInputProps {
  onPress: () => void;
  dateOfBirth: string;
}

/**
 * DateInput component renders a touchable text input for selecting a date.
 *
 * @returns {JSX.Element} The rendered DateInput component.
 */
const DateInput: React.FC<DateInputProps> = ({ onPress, dateOfBirth }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.dateInput}>
      <Text style={styles.dateInputText}>
        {dateOfBirth ? dateOfBirth : 'Date of Birth (DD/MM/YYYY)'}
      </Text>
    </TouchableOpacity>
  );
};

export default DateInput;