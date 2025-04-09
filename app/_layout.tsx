import { Stack } from 'expo-router';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Platform,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import ToastManager from '@/components/ToastManager';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ToastManager>
      <>
        <ExpoStatusBar
          style={colorScheme === 'dark' ? 'light' : 'dark'}
          hidden={true}
        />
        <SafeAreaView style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              cardStyle: { flex: 1 },
            }}
          >
            <Stack.Screen name="Landing" />
            <Stack.Screen name="LoginPage" />
            <Stack.Screen name="SignUpPage" />
            <Stack.Screen name="OtpVerify" />
            <Stack.Screen name="Home" />
          </Stack>
        </SafeAreaView>
      </>
    </ToastManager>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
