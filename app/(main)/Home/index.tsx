import { Button } from '@components/Button/Button';
import Dropdown from '@components/Dropdown/Dropdown';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import Input from '@components/Input/Input';
import { HomeContainer } from './styles';

type FormData = {
  name: string;
};

const Home = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <HomeContainer>
      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Home
      </Text>
      <Dropdown
        options={[
          {
            label: 'Teste',
            value: 'teste',
          },
          {
            label: 'Teste 2',
            value: 'teste2',
          },
        ]}
        control={control}
        name="name"
      />
      <Button
        style={{
          marginTop: 20,
          width: '90%',
        }}
        onPress={handleSubmit(onSubmit)}
      >
        Botão
      </Button>
    </HomeContainer>
  );
};

export default Home;
