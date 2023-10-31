import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableWithoutFeedback, View } from 'react-native';
import Searchbar from '@components/Searchbar/Searchbar';
import LogoSVG from '@assets/LogoSVG.svg';
import SearchFilter from '@components/SearchFilter/SearchFilter';
import { data } from 'data/data';
import { Menu } from '@components/User/User';
import { useAuth } from 'contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';
import { HomeContainer, HomeText } from './styles';

type FormData = {
  name: string;
};

const Home = () => {
  const { userInfo } = useAuth();
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (_data: FormData) => {
    console.log(_data);
  };

  return (
    <HomeContainer>
      <TouchableWithoutFeedback
        onPress={() => setIsMenuOpen(false)}
        style={{ height: '100%', width: '100%' }}
      >
        <View style={{ height: '100%', width: '100%' }}>
          <LogoSVG height={100} width={100} style={{}} />
          <Menu
            isOpen={isMenuOpen}
            handleOpenMenu={() => setIsMenuOpen(true)}
            type="USER"
          />
          <HomeText onPress={async () => signOut(FIREBASE_AUTH)}>
            Bem-vindo {userInfo?.displayName}
          </HomeText>
          <Searchbar
            placeholder="Pesquisar"
            name="name"
            value={input}
            onChangeText={text => setInput(text)}
            iconLeft="search"
            control={control}
          />
          <SearchFilter data={data} input={input} setInput={setInput} />
        </View>
      </TouchableWithoutFeedback>
    </HomeContainer>
  );
};

export default Home;
