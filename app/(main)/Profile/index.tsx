import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { useAuth } from 'contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
import { ProfileContainer, UserContainer, UserImage, UserText } from './styles';

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
    <ProfileContainer>
      <UserContainer>
        <UserImage source={require('@assets/bento.png')} />
        <UserText>{userInfo?.displayName}</UserText>
      </UserContainer>
    </ProfileContainer>
  );
};

export default Profile;
