import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CompressPDF from '../screens/CompressPDF';
import CompressImg from '../screens/CompressImg';
import PDFtoDoc from '../screens/PDFtoDoc';
import Download from '../screens/Download';

const Stack = createNativeStackNavigator();
const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="CompressPDF"
          component={CompressPDF}
          options={{title: 'Compress PDF'}}
        />
        <Stack.Screen
          name="CompressImg"
          component={CompressImg}
          options={{title: 'Compress Image'}}
        />
        <Stack.Screen
          name="PDFtoDoc"
          component={PDFtoDoc}
          options={{title: 'Convert PDF to Doc'}}
        />
        <Stack.Screen name="Download" component={Download} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
