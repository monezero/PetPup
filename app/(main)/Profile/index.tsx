import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from 'contexts/AuthContext';
import { signOut, updateProfile } from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert, ActivityIndicator } from 'react-native'; // Importando ActivityIndicator
import {
  LoadingProfile,
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
  const [imageUser, setImageUser] = useState<string | null>(
    userInfo?.photoURL || null,
  );
  const [loading, setLoading] = useState<boolean>(false); // Estado para controlar o carregamento da imagem

  const { control, handleSubmit } = useForm<FormData>();

  const storage = getStorage();
  const storageRef = ref(storage);

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        setLoading(true); // Indicar que o carregamento está em andamento
        const downloadURL = await getDownloadURL(
          ref(storage, `images/${userInfo?.uid}/profile_picture.jpeg`),
        );
        setImageUser(downloadURL);
      } catch (error) {
        console.log('Erro ao recuperar a imagem do usuário:', error);
        // Caso ocorra algum erro, mantenha a imagem padrão ou faça outra ação necessária
      } finally {
        setLoading(false); // Indicar que o carregamento foi concluído (com sucesso ou erro)
      }
    };

    fetchUserProfileImage();
  }, [userInfo?.uid, storage]);

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

  const saveImage = async (imagePath: string, image: string) => {
    try {
      setLoading(true); // Indicar que o carregamento está em andamento
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';

      xhr.onload = async () => {
        const blob = xhr.response;
        const imageRef = ref(storage, imagePath);

        // Metadados do arquivo
        const metadata = {
          contentType: 'image/jpeg',
        };

        // Inicie o upload
        const uploadTask = uploadBytesResumable(imageRef, blob, metadata);

        // Monitorar o progresso, erros e conclusão do upload
        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload está ${progress}% concluído`);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload pausado');
                break;
              case 'running':
                console.log('Upload em andamento');
                break;
              default:
                console.log('Estado do upload desconhecido');
                break;
            }
          },
          error => {
            switch (error.code) {
              case 'storage/unauthorized':
                console.error(
                  'Usuário não tem permissão para acessar o objeto',
                );
                break;
              case 'storage/canceled':
                console.error('Usuário cancelou o upload');
                break;

              default:
                console.error('Erro desconhecido durante o upload:', error);
                break;
            }
          },
          async () => {
            // Upload concluído
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // Atualizar a URL da foto do perfil no Firebase Authentication
              await updateProfile(userInfo, { photoURL: downloadURL });

              // Atualizar o estado da imagem do usuário
              setImageUser(downloadURL);
            } catch (error) {
              console.error('Erro ao obter a URL da imagem:', error);
            } finally {
              setLoading(false); // Indicar que o carregamento foi concluído
            }
          },
        );
      };

      xhr.onerror = e => {
        console.log(e);
        throw new TypeError('Network request failed');
      };

      xhr.open('GET', image, true);
      xhr.send(null);
    } catch (error) {
      console.log('Erro durante o upload');
      throw error;
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    // Salvar imagem
    if (!result.canceled) {
      const imagePath = `images/${userInfo?.uid}/profile_picture.jpeg`;
      await saveImage(imagePath, result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const imagePath = `images/${userInfo?.uid}/profile_picture.jpeg`;
        await saveImage(imagePath, result.assets[0].uri);
      }
    } catch (error) {
      alert(`Erro com o upload da imagem:${error.message}`);
    }
  };

  return (
    <ProfileContainer>
      <UserContainer>
        <UserImageWrapper onPress={() => handleImageUser()}>
          {loading ? (
            <LoadingProfile />
          ) : (
            <UserImage
              uri={imageUser}
              source={imageUser ? { uri: imageUser } : null}
            />
          )}
        </UserImageWrapper>
        <UserText>{userInfo?.displayName}</UserText>
        <UserText>{userInfo?.email}</UserText>
      </UserContainer>
    </ProfileContainer>
  );
};

export default Profile;
