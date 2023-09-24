import { cachorro } from 'data/data';
import { bento } from 'data/data';
import { useState } from 'react';
import { Redirect, useNavigation } from 'expo-router';
import { MenuContainer, MenuImage, MenuView } from './style';

interface MenuProps {
  onPress: () => void;
  onPressLogout: () => void;
}

export const Menu = (props: MenuProps) => {
  return (
    <MenuContainer>
      <MenuImage source={bento} />
    </MenuContainer>
  );
};
