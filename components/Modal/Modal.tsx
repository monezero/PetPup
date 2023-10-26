import React from 'react';
import { Text } from 'react-native';
import {
  ModalButton,
  ModalContainer,
  ModalContent,
  ModalTypeStyleProps,
  TextModal,
} from './styles';

interface ModalProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  type: ModalTypeStyleProps;
}

export const Modal = ({ text, isOpen, onClose, type }: ModalProps) => {
  return (
    isOpen && (
      <ModalContainer transparent animationType="fade">
        <ModalContent type={type ?? 'PRIMARY'}>
          <TextModal>{text}</TextModal>

          <ModalButton onPress={onClose}>
            <Text>Fechar</Text>
          </ModalButton>
        </ModalContent>
      </ModalContainer>
    )
  );
};
