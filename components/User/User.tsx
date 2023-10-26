import React, { useState } from 'react';
import { Link, Redirect, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
import { Modal } from '@components/Modal/Modal';
import {
  MenuContainer,
  MenuContainerVisible,
  MenuImage,
  MenuText,
} from './style';

interface MenuProps {
  onPress: () => void;
  onPressLogout: () => void;
  isOpen: boolean;
  handleClose: () => void;
}
export const Menu = ({
  isOpen,
  handleOpenMenu,
  onPressLogout,
  OnPress,
}: MenuProps) => {
  const [openModal, setOpenModal] = useState(false);
  const handleMenuImagePress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <MenuContainer>
      <TouchableOpacity onPress={handleOpenMenu}>
        <MenuImage source={require('@assets/bento.png')} />
      </TouchableOpacity>

      {isOpen && (
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          text="Sucesso, verifique seu e-mail."
          type="REGISTER"
        />
      )}
    </MenuContainer>
  );
};
