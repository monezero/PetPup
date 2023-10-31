import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modal } from '@components/Modal/Modal';
import { MenuContainer, MenuImage } from './style';

interface MenuProps {
  isOpen: boolean;
  handleOpenMenu: () => void;
  type: 'USER' | 'REGISTER';
}

export const Menu = ({ isOpen, handleOpenMenu, type }: MenuProps) => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <MenuContainer>
      <TouchableOpacity
        onPress={() => {
          handleOpenMenu(); // Abrir o menu
          showModal(); // Abrir o modal
        }}
      >
        <MenuImage source={require('@assets/bento.png')} />
      </TouchableOpacity>

      {isOpen && (
        <Modal
          isOpen={openModal}
          onClose={closeModal}
          text="Sair da conta"
          text2="Ir para Perfil"
          type={type ?? 'REGISTER'}
        />
      )}
    </MenuContainer>
  );
};
