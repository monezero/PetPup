import { theme } from '@global/theme';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

type AvatarProps = {
  uri: string;
};
export const ProfileContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 0px 10px;
  background-color: #2980b9;
`;

export const UserContainer = styled.View`
  margin-top: 10%;
  justify-self: center;
  align-items: center;
  min-height: 90%;
  max-height: 90%;
  max-width: 90%;
  min-width: 90%;
  background-color: #f2f2f2;
  border-radius: 16px;
`;

export const UserImage = styled(Image)<AvatarProps>`
  height: 100%;
  width: 100%;
  border-radius: 50px;
`;

export const UserImageWrapper = styled.TouchableOpacity`
  position: absolute;
  top: -30px;
  border: 4px;
  border-color: #f2f2f2;
  border-radius: 50px;
  height: 100px;
  width: 100px;
`;

export const UserInputContainer = styled.View`
  max-width: 100%;
  min-width: 90%;
  top: 100px;
`;

export const UserText = styled.Text`
  font-family: ${theme.fonts.roboto_700};
  font-size: 18px;
  color: ${theme.colors.text_black};
  padding: 18px;
`;

export const LoadingProfile = styled.ActivityIndicator`
  height: 400px;
  width: 400px;
  border-radius: 50px;
  overflow: hidden;
  color: black;
`;
