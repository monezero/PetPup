import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from 'contexts/AuthContext';
import Login from './(auth)/Login';

WebBrowser.maybeCompleteAuthSession();

export default () => {
  const {
    userInfo,
    setUserInfo,
    loading,
    setLoading,
    request,
    response,
    promptAsync,
  } = useAuth();
  return <Login promptAsync={promptAsync} />;
};
