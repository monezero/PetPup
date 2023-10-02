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

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
import { LoginContainer } from './styles';

const Signup = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignOnForm>({
    resolver: yupResolver(SignOnSchema),
  });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [samepassword, setSamePassword] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const showModal = () => {
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 10000);
  };
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
      alert('Verifique seu email');
      showModal();
      setTimeout(() => {
        router.replace('/Login');
      }, 3000);
    } catch (error: Error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error ao registrar',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
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
        autoCapitalize="none"
        onChangeText={text => setName(text)}
      />
      <Input
        control={control}
        placeholder="Email"
        name="email"
        iconLeft="email"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <Input
        control={control}
        placeholder="Senha"
        password
        name="password"
        iconLeft="lock"
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
      />
      <Input
        control={control}
        placeholder="Confirme sua senha"
        password
        name="confirmpassword"
        iconLeft="lock"
        onChangeText={text => setSamePassword(text)}
      />
      <Button onPress={signUp}>Confirmar</Button>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        text="Sucesso"
      />
    </LoginContainer>
  );
};
export default Signup;
