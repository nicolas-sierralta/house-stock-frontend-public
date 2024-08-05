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

export const Label = styled.Text`
  font-size: 16px;
  color: #050315;
  margin-bottom: 5px;
`;

export const BubblesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

export const Bubble = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#2f27ce' : '#dedcff')};
  padding: 10px 15px;
  border-radius: 20px;
  margin: 5px;
`;

export const BubbleText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#fbfbfe' : '#050315')};
`;

export const DateInputContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border: 1px solid #dedcff;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 15px;
`;

export const DateInputText = styled.Text`
  flex: 1;
  color: #050315;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
  margin-top: 10px;
  border-top-width: 1px;
  border-top-color: #dedcff;
`;

interface ButtonProps {
  primary?: boolean;
}

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ primary }: ButtonProps) => (primary ? "#2f27ce" : "transparent")};
  padding: 10px 20px;
  border-radius: 5px;
  border: ${({ primary }: ButtonProps) => (primary ? "none" : "1px solid #2f27ce")};
  width: 45%;
  align-items: center;
  margin: 0 5px;
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 14px;
  color: ${({ primary }: ButtonProps) => (primary ? "#fbfbfe" : "#2f27ce")};
`;
