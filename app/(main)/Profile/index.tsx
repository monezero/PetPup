import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from 'contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import {
  ProfileContainer,
  UserContainer,
  UserImage,
  UserImageWrapper,
  UserText,
} from './styles';

type FormData = {
  name: string;
};

const Profile = () => {
  const { userInfo } = useAuth();
  const [imageUser, setImageUser] = useState<string>(
    'https://media.discordapp.net/attachments/415681919259508738/1194346793807392878/GDXV-IaWEAATeK9.jpg?ex=65b00521&is=659d9021&hm=b8873dc127da81220d499b8dc09319d35851a02e2d318f828efa13ca600a17eb&=&format=webp',
  );
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { control, handleSubmit } = useForm<FormData>();
  const logout = async () => signOut(FIREBASE_AUTH);
  const onSubmit = (_data: FormData) => {
    console.log(_data);
  };

  const handleImageUser = () => {
    Alert.alert(
      'Selecione',
      'Informe de onde você quer pegar a foto',
      [
        {
          text: 'Galeria',
          onPress: () => pickImageFromGallery(),
          style: 'default',
        },
        {
          text: 'Camera',
          onPress: () => pickImageFromCamera(),
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('fechou'),
      },
    );
  };
  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUser(result.assets[0].uri);
    }
  };

  return (
    <ProfileContainer>
      <UserContainer>
        <UserImageWrapper onPress={() => handleImageUser()}>
          <UserImage source={require('@assets/bento.png')} />
        </UserImageWrapper>
        <UserText>{userInfo?.displayName}</UserText>
        <UserText>{userInfo?.email}</UserText>
      </UserContainer>
    </ProfileContainer>
  );
};

export default Profile;
