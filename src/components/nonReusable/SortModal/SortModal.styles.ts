import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    color: 'red',
    fontSize: 16,
  },
});
