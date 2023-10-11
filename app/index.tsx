import * as React from 'react';
import { Redirect } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'; // Modified import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '@services/firebase';

WebBrowser.maybeCompleteAuthSession();
export default () => {
  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '253656573885-gebbdagh8adjrk7veedgqap4968mt1tu.apps.googleusercontent.com',
    androidClientId:
      '253656573885-emhgjtl5379qqa535gm9fkjc0uvjcskn.apps.googleusercontent.com',
    expoClientId:
      '253656573885-uisrngivghfbp3kuvqg2dpk0ed3rt5s2.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential);
    }
  }, [response]);

  return <Redirect href="/Login" promptAsync={promptAsync} />;
};
