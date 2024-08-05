import styled from 'styled-components/native';

export const SimpleListContainer = styled.View`
  flex-direction: column;
  padding: 10px;
  background-color: #fbfbfe;
`;

export const SimpleListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 2px;
  border-bottom-color: #dedcff;
  background-color: #2f27ce;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const SimpleListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #dedcff;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Column = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListItemText = styled.Text`
  font-size: 16px;
  color: #050315;
  text-align: center;
`;

export const ListHeaderText = styled.Text`
  font-size: 16px;
  color: #fbfbfe;
  text-align: center;
  font-weight: bold;
`;

export const ActionColumn = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 5px;
  margin: 0 5px;
`;

export const TouchableColumn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;
