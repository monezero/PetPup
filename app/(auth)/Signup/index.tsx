import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React, { useState } from 'react';
import { Modal } from '@components/Modal/Modal';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { SignOnForm, SignOnSchema } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Toast from 'react-native-toast-message';

import { LoginContainer } from './styles';

const Signup = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignOnForm>({
    resolver: yupResolver(SignOnSchema),
  });
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 10000);
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
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        text="Sucesso"
      />
    </LoginContainer>
  );
};
export default Signup;
