import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React, { useState } from 'react';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { ForgotPasswordForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import styled from 'styled-components/native';
import { theme } from '@global/theme';
import { LoginContainer } from './styles';

const ForgotPassword = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  };
  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    // resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      if (!data.email) {
        throw new Error('Por favor, preencha todos os campos');
      }

      console.log('🚀 ~ file: index.tsx:16 ~ data:', data);
      showModal();
      setTimeout(() => {
        router.replace('/Signup');
      }, 3000);
    } catch (error: Error) {
      console.error('Erro ao enviar o email:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar o email',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <LoginContainer>
      <LogoSVG height={300} />
      <Input
        control={control}
        placeholder="Email"
        name="email"
        iconLeft="email"
      />
      <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>

      <Toast ref={ref => Toast.setRef(ref)} />
      <ModalContainer
        visible={modalOpen}
        transparent
        onRequestClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalContent>
          <TextModal>Email enviado{'\n'}</TextModal>
        </ModalContent>
      </ModalContainer>
    </LoginContainer>
  );
};

export default ForgotPassword;

export const ModalContainer = styled.Modal`
  justify-content: center;
  align-items: center;
  margin: 0px;
`;

export const ModalContent = styled.View`
  margin-top: 260px;
  width: 60%;
  align-self: center;
  background-color: ${theme.colors.success};
  padding: 2px;
  border-radius: 20px;
  border-width: 2px;
  border-color: '#000';
  justify-content: center;
  align-items: center;
`;

export const TextModal = styled.Text`
  margin-top: 18px;
  align-self: center;
  font-family: 'Roboto_700Bold';
  font-size: 16px;
  margin-bottom: 6px;
`;
