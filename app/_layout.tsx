import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalStatusBar from '@/components/GlobalStatusBar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GlobalStatusBar />
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="index2" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}
