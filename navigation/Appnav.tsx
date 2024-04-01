import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CompressPDF from '../screens/CompressPDF';
import CompressImg from '../screens/CompressImg';
import PDFtoDoc from '../screens/PDFtoDoc';

const Stack = createNativeStackNavigator();
const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CompressPDF" component={CompressPDF} />
        <Stack.Screen name="CompressImg" component={CompressImg} />
        <Stack.Screen name="PDFtoDoc" component={PDFtoDoc} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
