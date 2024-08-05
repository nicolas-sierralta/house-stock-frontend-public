import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #dedcff; /* Background color */
  padding: 10px 15px;
  width: 100%;
`;

export const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #050315; /* Text color */
`;

export const Button = styled.TouchableOpacity`
  padding: 5px;
`;
