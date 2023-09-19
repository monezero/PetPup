import styled from 'styled-components/native';
import { Image } from 'expo-image';
import { theme } from '@global/theme';

export const Logo = styled(Image)`
  width: 100%;
  height: 100px;
`;

export const LoginBox = styled.KeyboardAvoidingView`
  padding: 20%;
  margin-top: 28%;
  height: 60%;
  width: 132%;
  align-self: center;
  justify-content: center;
  border-radius: 32px;
  background-color: ${theme.colors.blue_200};
`;

export const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 50px;
  background-color: ${theme.colors.blue_500};
`;

export const SmallText = styled.Text`
  align-self: flex-end;
  margin-left: 8px;
  margin-bottom: 10px;
  font-family: 'Roboto_400Regular';
  text-shadow: -1px 1px 10px black;
  color: ${theme.colors.text_white};
`;

export const OrView = styled.View`
  height: 1px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${theme.colors.blue_700};
  width: 100%;
`;
