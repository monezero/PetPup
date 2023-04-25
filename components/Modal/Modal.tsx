import React, { useState } from 'react';
import { Button } from '@components/Button/Button';
import { ModalContainer, ModalContent, TextModal } from './styles';

export const Modal = ({ onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ModalContainer
      animationType="slide"
      visible={modalOpen}
      transparent
      onRequestClose={onClose}
    >
      <ModalContent>
        <TextModal>Registrado com sucesso</TextModal>
        <Button
          style={{ backgroundColor: '#4BB543' }}
          onPress={() => {
            setModalOpen(false);
          }}
        >
          Confirmar
        </Button>
      </ModalContent>
    </ModalContainer>
  );
};
