import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { SignOnForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import { theme } from '@global/theme';
import { LoginContainer } from './styles';

const SignUp = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignOnForm>({});
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  };
  const onSubmit = (data: SignOnForm) => {
    try {
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmpassword
      ) {
        throw new Error('Por favor preencha todos os campos');
      }
      console.log('🚀 ~ file: index.tsx:16 ~ data:', data);
      showModal();
      setTimeout(() => {
        router.replace('/Login');
      }, 3000);
    } catch (error: Error) {
      console.error('Erro ao fazer cadastro:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
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
        placeholder="Nome"
        name="name"
        iconLeft="person"
      />
      <Input
        control={control}
        placeholder="Email"
        name="email"
        iconLeft="email"
      />
      <Input
        control={control}
        placeholder="Senha"
        password
        name="password"
        iconLeft="lock"
      />
      <Input
        control={control}
        placeholder="Confirme sua senha"
        password
        name="confirmpassword"
        iconLeft="lock"
      />
      <Button onPress={handleSubmit(onSubmit)}>Confirmar</Button>
      <ModalContainer
        visible={modalOpen}
        transparent
        onRequestClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalContent>
          <TextModal>Registrado com sucesso{'\n'}</TextModal>
        </ModalContent>
      </ModalContainer>
    </LoginContainer>
  );
};

export default SignUp;

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
