import React, { useState } from 'react';
import { Link, Redirect, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
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
  const handleMenuImagePress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <MenuContainer>
      <TouchableOpacity onPress={handleOpenMenu}>
        <MenuImage source={require('@assets/bento.png')} />
      </TouchableOpacity>

      {isOpen && (
        <TouchableOpacity>
          <MenuContainerVisible>
            <Link href="Login">
              <MenuText onPress={async () => signOut(FIREBASE_AUTH)}>
                Sair
              </MenuText>
            </Link>
          </MenuContainerVisible>
        </TouchableOpacity>
      )}
    </MenuContainer>
  );
};
