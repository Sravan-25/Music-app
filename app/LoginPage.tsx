import React, { useState, useContext } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Fields from '../components/InputFields';
import Buttons from '../components/Buttons';
import { loginUser, storeAuthToken } from '../server/auth';
import { router } from 'expo-router';
import Colors from '@/data/Colors';
import { ToastContext, ToastContextType } from '../components/ToastManager';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext<ToastContextType | undefined>(ToastContext);

  const handleLogin = async () => {
    if (!email || !password) {
      toastContext?.showToast('Please enter both email and password', 'error');
      return false;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      await storeAuthToken(response.data.token);
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      toastContext?.showToast(
        error.message || 'Login failed. Please try again.',
        'error'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = async () => {
    try {
      const success = await handleLogin();
      if (success) {
        toastContext?.showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => router.replace('/pages/Home'), 1000);
      }
    } catch (error) {
      console.error('Login process error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/docit.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>LogIn</Text>
      <Text style={styles.welcome}>Welcome back!</Text>

      <View style={styles.inputContainer}>
        <Fields
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Fields
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Buttons
          text={isLoading ? 'Logging in...' : 'LogIn'}
          onPress={handleSignin}
          disabled={isLoading}
        />
      </View>

      <Pressable onPress={() => router.push('/SignUpPage')}>
        <Text style={styles.signUpText}>Don't have an account? Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 5,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  welcome: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 30,
    color: Colors.LIGHT_GRAY,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    gap: 10,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
  },
  signUpText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.PRIMARY,
    marginTop: 10,
  },
});
