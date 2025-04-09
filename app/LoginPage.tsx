import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Fields from '../components/InputFields';
import Buttons from '../components/Buttons';
import { loginUser } from '../server/auth';
import { router } from 'expo-router';
import Colors from '@/data/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      await AsyncStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleSignin = async () => {
    try {
      const success = await handleLogin();
      if (success) {
        router.push('/Home');
      }
    } catch (error) {
      console.error('Login Failed:', error);
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
        <Buttons text="LogIn" onPress={handleSignin} />
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
