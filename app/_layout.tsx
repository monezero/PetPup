/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { theme } from '@global/theme';
import Toast, { ErrorToast } from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from 'contexts/AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { QueryClient, QueryClientProvider } from 'react-query';
import { handleError } from '@utils/handleError';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from 'contexts/AuthContext';
import useUpdate from '@hooks/useUpdate';

import { Slot, SplashScreen } from 'expo-router';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@services/firebase';

export { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';

const toastConfig = {
  error: (props: any) => <ErrorToast {...props} text1NumberOfLines={2} />,
};

setDefaultOptions({ locale: ptBR });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 20000,
      onError: handleError,
      retry: false,
      initialDataUpdatedAt: 0,
    },
  },
});

const App = () => {
  const isLoading = useUpdate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, userLogin => {
      console.log('user', userLogin);
      setUser(userLogin);
    });
  }, []);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded || isLoading) {
    return SplashScreen.preventAutoHideAsync;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="dark" />
                <Slot />
                <Toast config={toastConfig} />
              </SafeAreaView>
            </SafeAreaProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
