import React, { useContext } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from 'firebase/auth'; // Modified import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '@services/firebase';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

WebBrowser.maybeCompleteAuthSession();
export const AuthProvider = props => {
  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '253656573885-gebbdagh8adjrk7veedgqap4968mt1tu.apps.googleusercontent.com',
    androidClientId:
      '253656573885-emhgjtl5379qqa535gm9fkjc0uvjcskn.apps.googleusercontent.com',
    expoClientId:
      '253656573885-uisrngivghfbp3kuvqg2dpk0ed3rt5s2.apps.googleusercontent.com',
  });

  const value = {
    userInfo,
    setUserInfo,
    loading,
    setLoading,
    request,
    response,
    promptAsync,
  };

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      await AsyncStorage.getItem('@user');
      const userJSON = await AsyncStorage.getItem('@user');
      const userData = userJSON ? JSON.parse(userJSON) : null;
      console.log('local storage:', userData);
      setUserInfo(userData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential);
    }
  }, [response]);

  React.useEffect(() => {
    checkLocalUser();
    const unsub = onAuthStateChanged(FIREBASE_AUTH, async user => {
      console.log('🚀 ~ file: AuthContext.tsx:69 ~ user:', user);
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
      } else {
        router.replace('Login');
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
