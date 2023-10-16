import { theme } from '@global/theme';
import styled from 'styled-components/native';

export const ModalContainer = styled.Modal`
  justify-content: center;
  align-items: center;
  margin: 0px;
`;

export const ModalContent = styled.View`
  margin-top: 260px;
  height: 33%;
  width: 70%;
  align-self: center;
  background-color: ${theme.colors.gray_200};
  padding: 2px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const TextModal = styled.Text`
  margin-top: 18px;
  align-self: center;
  font-family: 'Roboto_700Bold';
  font-size: 32px;
  margin-bottom: 6px;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 100%;
  min-height: 45px;
  justify-content: center;
  position: absolute;
  bottom: 0;
  align-items: center;
  background-color: ${theme.colors.success};
  border-radius: 4px;
  border-color: black;
  font-size: 18px;
  font-family: 'Roboto_700Bold';
  flex-direction: row;
  border-radius: 18px;
  margin-bottom: 18px;
`;
