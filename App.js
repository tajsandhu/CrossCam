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
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native'

import Camera from './src/Camera';
import Gallery from './src/Gallery';

//creates a stack for navigation
const Stack = createStackNavigator();

//configures aws amplify with the generate aws-exports file
Amplify.configure(awsconfig);

//functional component to handle the stack navigation
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Camera' component={Camera} options={{headerShown: false}}/>
        <Stack.Screen name='Gallery' component={Gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/* TODO: implement custom login screen */
//uses the default aws cognito login screen
export default withAuthenticator(App);