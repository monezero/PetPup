import React from 'react';
import { Text } from 'react-native';
import {
  ModalButton,
  ModalContainer,
  ModalContent,
  ModalTypeStyleProps,
  TextModal,
  ViewTypeStyleProps,
} from './styles';

interface ModalProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  type: ModalTypeStyleProps;
}

interface ViewProps {
  type: ViewTypeStyleProps;
}

export const Modal = ({ text, isOpen, onClose, type }: ModalProps) => {
  console.log(type);
  return (
    isOpen && (
      <ModalContainer transparent animationType="fade" type="USER">
        <ModalContent type={type}>
          <TextModal>{text}</TextModal>

          {type === 'REGISTER' && (
            <ModalButton onPress={onClose}>
              <Text>Fechar</Text>
            </ModalButton>
          )}
        </ModalContent>
      </ModalContainer>
    )
  );
};
