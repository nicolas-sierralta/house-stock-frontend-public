import styled from 'styled-components/native';

export const MenuContainer = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  elevation: 5;
`;

export const Header = styled.View`
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #dedcff;
`;

export const HeaderText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #050315;
`;

export const MenuItem = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  background-color: ${({ selected }) => (selected ? '#E0E0E0' : 'transparent')};
  border-radius: 5px;
`;

export const MenuItemText = styled.Text<{ selected: boolean }>`
  font-size: 18px;
  color: ${({ selected }) => (selected ? '#2F80ED' : '#050315')};
  margin-left: 15px;
`;

export const modalStyles = {
  modal: {
    margin: 0,
    justifyContent: 'flex-start' as const, // Use 'as const' to ensure the value is a valid type
  },
  innerContainer: {
    width: '60%' as const, // Use 'as const' to ensure the value is a valid type
    height: '100%' as const, // Use 'as const' to ensure the value is a valid type
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
};

