import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { SignOnForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import { TextModal } from '@components/Modal/styles';
import Toast from 'react-native-toast-message';
import { LoginContainer } from './styles';

const SignUp = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignOnForm>({});
  const [modalOpen, setModalOpen] = useState(false);

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
      setModalOpen(true);
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
        visible={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <TextModal>Registrado com sucesso</TextModal>
      </Modal>
    </LoginContainer>
  );
};

export default SignUp;
