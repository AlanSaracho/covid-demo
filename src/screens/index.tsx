import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Login from './Login/Login';
import Home from './Home/Home';
import CountryCases from './Country/Country';

import { useRecoilValue } from 'recoil';
import { SessionState, sessionState } from '../store/session';
import { Country } from 'types';

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
    <Stack.Screen name="Login" component={Login} />
  </>
);

export const Screens = () => {
  const { accessToken } = useRecoilValue<SessionState>(sessionState);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        {accessToken ? appStack : unlogedStack}
      </Stack.Navigator>
    </NavigationContainer>
  )
};
