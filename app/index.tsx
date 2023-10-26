import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from 'contexts/AuthContext';
import { Redirect } from 'expo-router';
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
  return userInfo ? (
    <Redirect href="/Home" />
  ) : (
    <Login promptAsync={promptAsync} />
  );
};
