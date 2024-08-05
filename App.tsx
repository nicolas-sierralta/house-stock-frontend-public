import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import InventoryScreen from './src/screens/InventoryScreen/InventoryScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token } = useAuth();

  return (
    <Stack.Navigator initialRouteName="Login">
      {token ? (
        <>
          <Stack.Screen name="Inventory" component={InventoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}

