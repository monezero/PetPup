import { cachorro } from 'data/data';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { MenuImage, MenuView } from './style';

interface MenuProps {
  onPress: () => void;
  onPressLogout: () => void;
}

export const Menu = (props: MenuProps) => {
  const [isMenu, setIsMenu] = useState(false);
  const navigation = useNavigation<AuthNavigatorRouteProps>();
  const handleLogout = () => {
    navigation.navigate('login');
  };

  return (
    <MenuView>
      <Menu
        onPressLogout={() => navigation.navigate('login')}
        onPress={() => setIsMenu(false)}
      />
      <MenuImage source={cachorro} />
    </MenuView>
  );
};
