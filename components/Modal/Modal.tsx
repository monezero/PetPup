import React from 'react';
import { Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
import {
  ModalButton,
  ModalContainer,
  ModalContent,
  ModalSegment,
  ModalTypeStyleProps,
  TextModal,
  ViewTypeStyleProps,
} from './styles';

interface ModalProps {
  text: string;
  text2?: string;
  isOpen: boolean;
  onClose: () => void;
  type: ModalTypeStyleProps;
}

interface ViewProps {
  type: ViewTypeStyleProps;
}

export const Modal = ({ text, text2, isOpen, onClose, type }: ModalProps) => {
  console.log(type);
  return (
    isOpen && (
      <ModalContainer transparent animationType="fade" type="USER">
        <ModalContent type={type}>
          <ModalSegment>
            <TextModal>{text}</TextModal>
          </ModalSegment>
          <ModalSegment>
            <TextModal>{text2}</TextModal>
          </ModalSegment>

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
