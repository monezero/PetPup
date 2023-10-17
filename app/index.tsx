import * as React from 'react';
import { Redirect } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth'; // Modified import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '@services/firebase';
import { ActivityIndicator, View } from 'react-native';
import Login from './(auth)/Login';

WebBrowser.maybeCompleteAuthSession();
export default () => {
  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '253656573885-gebbdagh8adjrk7veedgqap4968mt1tu.apps.googleusercontent.com',
    androidClientId:
      '253656573885-emhgjtl5379qqa535gm9fkjc0uvjcskn.apps.googleusercontent.com',
    expoClientId:
      '253656573885-uisrngivghfbp3kuvqg2dpk0ed3rt5s2.apps.googleusercontent.com',
  });

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
      if (user) {
        console.log(JSON.stringify(user, null));
        setUserInfo(user);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
      } else {
        console.log('no user');
      }
    });

    return () => unsub;
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  console.log('promptAsync index alo', promptAsync);
  return userInfo ? (
    <Redirect href="/Home" />
  ) : (
    <Login promptAsync={promptAsync} />
  );
};
