import { theme } from '@global/theme';
import { Modal, View, Text } from 'react-native';
import styled from 'styled-components/native';

export type ModalTypeStyleProps = 'REGISTER' | 'USER';

type ModalProps = {
  type: ModalTypeStyleProps;
};

export const ModalContainer = styled(Modal)<ModalProps>`
  justify-content: center;
  align-items: ${({ type }) => (type === 'USER' ? 'flex-end' : 'center')};
  margin: 0px;
`;

export const ModalContent = styled(View)<ModalProps>`
  flex-direction: column;
  margin-top: ${({ type }) => (type === 'REGISTER' ? '260px' : '8px')};
  margin-right: ${({ type }) => (type === 'REGISTER' ? '0px' : '4px')};
  min-height: 10%;
  width: 70%;
  align-self: ${({ type }) => (type === 'REGISTER' ? 'center' : 'flex-end')};
  background-color: ${({ type }) =>
    type === 'REGISTER' ? theme.colors.gray_200 : theme.colors.blue_200};
  padding: 2px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border-color: ${theme.colors.blue_700};
  border-width: 0.5px;
`;

export const TextModal = styled(Text)<ModalProps>`
  align-self: center;
  font-family: 'Roboto_700Bold';
  font-size: ${({ type }) => (type === 'REGISTER' ? '32px' : '18px')};
  margin-bottom: 6px;
`;

export const ModalSegment = styled.TouchableOpacity`
  margin-top: 10px;
  border-radius: 8px;
  justify-content: center;
  width: 100%;
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
