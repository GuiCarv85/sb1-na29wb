import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { WhatsAppProvider } from './src/context/WhatsAppContext';
import { NotificationProvider } from './src/context/NotificationContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <WhatsAppProvider>
        <NotificationProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerShadowVisible: false,
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            >
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ title: 'Priority Inbox' }}
              />
              <Stack.Screen 
                name="Chat" 
                component={ChatScreen}
                options={({ route }) => ({ title: route.params?.contact?.name })}
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{ title: 'Settings' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="dark" />
        </NotificationProvider>
      </WhatsAppProvider>
    </SafeAreaProvider>
  );
}