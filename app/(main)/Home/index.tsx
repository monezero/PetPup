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
import SearchFilter from '@components/SearchFilter/SearchFilter';
import { data } from 'data/data';
import { Menu } from '@components/User/User';
import { Redirect } from 'expo-router';
import { HomeContainer } from './styles';

type FormData = {
  name: string;
};

const Home = () => {
  const [input, setInput] = useState('');
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleLogout = () => {
    <Redirect href="/Login" />;
  };

  return (
    <HomeContainer>
      <LogoSVG
        height={100}
        width={100}
        style={{
          marginBottom: -10,

          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
        }}
      />
      <Menu />
      <Searchbar
        placeholder="Pesquisar"
        name="name"
        value={input}
        onChangeText={text => setInput(text)}
        iconLeft="search"
        control={control}
      />
      <SearchFilter data={data} input={input} setInput={setInput} />
    </HomeContainer>
  );
};

export default Home;
