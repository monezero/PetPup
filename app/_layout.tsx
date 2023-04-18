/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { theme } from '@global/theme';
import Toast, { ErrorToast } from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';
import AuthProvider from '@hooks/useAuth';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { QueryClient, QueryClientProvider } from 'react-query';
import { handleError } from '@utils/handleError';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import useUpdate from '@hooks/useUpdate';

import { Slot, SplashScreen } from 'expo-router';

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
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded || isLoading) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="auto" />
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
