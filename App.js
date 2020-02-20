/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import Camera from './src/Camera';
import Gallery from './src/Gallery';
import FullImage from './src/FullImage';
import Settings from './src/Settings';
import Login from './src/Login';
import AuthLoading from './src/AuthLoading';

Amplify.configure(awsconfig);

//creates a stack for navigation
const Stack = createStackNavigator();

//functional component to handle the stack navigation
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Loading'}>
        <Stack.Screen name='Loading' component={AuthLoading} />
        <Stack.Screen name='Camera' component={Camera} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Gallery' component={Gallery} />
        <Stack.Screen name='Image' component={FullImage} />
        <Stack.Screen name='Settings' component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/* TODO: implement custom login screen */
//uses the default aws cognito login screen
export default App;