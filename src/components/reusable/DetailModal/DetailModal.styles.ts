import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Background = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Dark semi-transparent background */
`;

export const DetailCard = styled(Animated.View)`
  width: 80%;
  background-color: #dedcff; /* Background color */
  padding: 20px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 5;
`;

export const CloseButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const CloseButtonText = styled.Text`
  font-size: 16px;
  color: #2f27ce; /* Primary color */
`;

export const CardTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #050315; /* Text color */
  margin-bottom: 15px;
`;

export const CardText = styled.Text`
  font-size: 18px;
  color: #050315; /* Text color */
  margin-bottom: 10px;
`;
