import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();
const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Setting" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
