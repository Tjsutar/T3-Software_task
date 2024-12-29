// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoggedInScreen from './src/screens/LoggedInScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SignInScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={SignUpScreen} options={{headerShown:false}} />
        <Stack.Screen name="LoggedIn" component={LoggedInScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
