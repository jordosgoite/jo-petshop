import * as React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './NavigationService';

import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import ForgotPassword from 'app/screens/ForgotPassword';

import ThemeController from '../components/ThemeController';
import { StatusBar } from 'react-native';
import { useStore } from '../store';
import Tasks from 'app/screens/Tasks';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

interface IProps {
  theme: Theme;
}

const AuthNavigator = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => (
  <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="StoreTasks" component={Tasks} />
  </LoggedInStack.Navigator>
);

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useStore(state => state.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="HomeStack" component={LoggedInNavigator} />
        ) : (
          <Stack.Screen
            name="LoginStack"
            component={AuthNavigator}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              headerRight: () => <ThemeController />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
