import { Button } from '@components/Button/Button';
import Dropdown from '@components/Dropdown/Dropdown';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import Input from '@components/Input/Input';
import Searchbar from '@components/Searchbar/Searchbar';
import LogoSVG from '@assets/LogoSVG.svg';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';
import { height, width } from '@global/constants';
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
      <LogoSVG
        height={100}
        width={100}
        style={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}
      />
      <Searchbar
        placeholder="Pesquisar"
        name="name"
        iconLeft="search"
        control={control}
      />
    </HomeContainer>
  );
};

export default Home;
