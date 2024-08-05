import styled from 'styled-components/native';

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #dedcff;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
`;

export const FooterButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FooterButtonContent = styled.View`
  align-items: center;
  justify-content: center;
`;

export const FooterButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #050315;
  margin-top: 5px;
  text-align: center;
`;
