import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Login from 'app/(auth)/Login';

type AuthRoutes = {
  login: undefined;
};

export type AuthNavigatorRouteProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export const AuthRoutes = () => {
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="login" component={Login} />
  </Navigator>;
};
