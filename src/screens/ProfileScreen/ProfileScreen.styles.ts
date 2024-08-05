import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fbfbfe;
  padding: 0px;
  padding-top: 40px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  background-color: #fbfbfe;
  padding: 20px;
  padding-top: 20px;
`;

export const ProfileDetail = styled.View`
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #050315;
  margin-bottom: 5px;
  align-self: flex-start;
`;

export const AvatarLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2f27ce;
  margin-top: 10px;
  margin-bottom: 15px;
  align-self: center;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #dedcff;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding-left: 10px;
  color: #050315;
`;

export const EditButton = styled.TouchableOpacity`
  background-color: #2f27ce;
  padding: 15px 20px;
  border-radius: 5px;
  align-items: center;
  margin-top: 20px;
  width: 48%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

export const PasswordInputContainer = styled.View`
  margin-bottom: 15px;
`;
