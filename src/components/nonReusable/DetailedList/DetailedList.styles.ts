import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  background-color: #fbfbfe;
`;

export const Card = styled(TouchableOpacity)`
  background-color: #ffffff;
  width: 48%;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
  position: relative;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #050315;
  margin-bottom: 10px;
`;

export const CardText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
`;

export const CardLocation = styled.Text`
  font-size: 14px;
  color: #2f27ce;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 15px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 2px 1px;
  border-radius: 2px;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
`;
