import React from 'react';
import { Text } from 'react-native';
import { ModalButton, ModalContainer, ModalContent, TextModal } from './styles';

interface ModalProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ text, isOpen, onClose }: ModalProps) => {
  return (
    isOpen && (
      <ModalContainer transparent animationType="fade">
        <ModalContent>
          <TextModal>{text}</TextModal>

          <ModalButton onPress={onClose}>
            <Text>Fechar</Text>
          </ModalButton>
        </ModalContent>
      </ModalContainer>
    )
  );
};
