import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React, { useState } from 'react';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import {
  ForgotPasswordForm,
  ForgotPasswordSchema,
} from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { Modal } from '@components/Modal/Modal';
import { LoginContainer, SmallText } from './styles';

const ForgotPassword = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 10000);
  };
  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      if (!data.email) {
        throw new Error('Por favor, preencha todos os campos');
      }

      console.log('🚀 ~ file: index.tsx:16 ~ data:', data);
      showModal();
      setTimeout(() => {
        router.replace('/Login');
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
      <SmallText>
        Para redefinir sua senha, informe o e-mail cadastrado
      </SmallText>
      <Input
        control={control}
        placeholder="Email"
        name="email"
        iconLeft="email"
      />
      <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>

      <Toast ref={ref => Toast.setRef(ref)} />

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        text="Email enviado com sucesso "
      />
    </LoginContainer>
  );
};

export default ForgotPassword;
