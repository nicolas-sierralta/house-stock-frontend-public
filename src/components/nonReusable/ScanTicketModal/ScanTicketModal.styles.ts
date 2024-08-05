import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 90%;
  max-height: 80%;
  background-color: #fbfbfe;
  padding: 20px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 10;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #dedcff;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #050315;
`;

export const CloseButton = styled.TouchableOpacity``;

export const CloseButtonText = styled.Text`
  font-size: 24px;
  color: #2f27ce;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;

export const FooterButtonRow = styled(ButtonRow)`
  border-top-width: 1px;
  border-top-color: #dedcff;
  padding-top: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #2f27ce;
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
  flex: 1;
  margin: 0 5px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #dedcff;
`;
