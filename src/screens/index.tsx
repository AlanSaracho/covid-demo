import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Login from './Login/Login';
import Home from './Home/Home';
import CountryCases from './Country/Country';

import { useSession } from '../store/session';
import { Country } from 'types';
import { Platform } from 'react-native';

export type AppParams = {
  Login: undefined,
  Home: undefined,
  Country: {
    country: Country;
  }
};

export type StackNavigationProps = NativeStackNavigationProp<AppParams>;

const Stack = createNativeStackNavigator<AppParams>();

const appStack = (
  <>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="Country"
      component={CountryCases}
      options={({ route }) => ({ title: route.params.country.Country })}
    />
  </>
);

const unlogedStack = (
  <>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
  </>
);

export const Screens = () => {
  const { session, signOut } = useSession();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent', elevation: 0 },
          statusBarStyle: Platform.OS === 'android' ? 'dark' : undefined,
          headerBackTitleVisible: false,
          headerRight: () => (
            <Ionicons
              size={32}
              name="power"
              onPress={signOut}
            />
          ),
        }}
      >
        {session.user ? appStack : unlogedStack}
      </Stack.Navigator>
    </NavigationContainer>
  )
};
