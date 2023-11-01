import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableWithoutFeedback, View } from 'react-native';
import Searchbar from '@components/Searchbar/Searchbar';
import LogoSVG from '@assets/LogoSVG.svg';
import SearchFilter from '@components/SearchFilter/SearchFilter';
import { data } from 'data/data';
import { Menu } from '@components/User/User';
import { useAuth } from 'contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
import { HomeContainer, HomeText } from './styles';

type FormData = {
  name: string;
};

const Profile = () => {
  const { userInfo } = useAuth();
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { control, handleSubmit } = useForm<FormData>();
  const logout = async () => signOut(FIREBASE_AUTH);
  const onSubmit = (_data: FormData) => {
    console.log(_data);
  };

  return (
    <View>
      <Text>Teste</Text>
    </View>
  );
};

export default Profile;
