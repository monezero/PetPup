import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modal } from '@components/Modal/Modal';
import { useAuth } from 'contexts/AuthContext';
import { MenuContainer, MenuImage } from './style';

interface MenuProps {
  isOpen: boolean;
  handleOpenMenu: () => void;
  type: 'USER' | 'REGISTER';
  closeModal: () => void;
}

export const Menu = ({
  isOpen,
  handleOpenMenu,
  type,
  closeModal,
}: MenuProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { userInfo } = useAuth();

  const showModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    closeModal(); // Close the modal
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
        <MenuImage source={{ uri: userInfo?.photoURL }} />
      </TouchableOpacity>

      {isOpen && (
        <Modal
          isOpen={openModal}
          onClose={onCloseModal}
          text="Sair da conta"
          text2="Ir para Perfil"
          type={type ?? 'REGISTER'}
        />
      )}
    </MenuContainer>
  );
};
