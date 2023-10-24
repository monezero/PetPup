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


    <Login promptAsync={promptAsync} />
  
};
