import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Fields from '@/components/InputFields';
import Buttons from '@/components/Buttons';
import { signupUser } from '@/server/auth';
import { router } from 'expo-router';
import Colors from '@/data/Colors';
import { ToastContext, ToastContextType } from '@/components/ToastManager';

export default function SignUpPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const toastContext = useContext<ToastContextType | undefined>(ToastContext);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toastContext?.showToast('Passwords do not match', 'error');
      return;
    }

    try {
      const response = await signupUser(name, email, password, confirmPassword);
      toastContext?.showToast(
        'Sign Up successful! Please verify your email',
        'success'
      );
      router.push(`/OtpVerify?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.error('Signup Error:', error.response?.data || error.message);
      toastContext?.showToast(
        error.response?.data?.error || 'Server error',
        'error'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/docit.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Register</Text>
      <Text style={styles.welcome}>Welcome to Doc IT</Text>
      <View style={styles.inputContainer}>
        <Fields value={name} onChangeText={setName} placeholder="Enter name" />
      </View>
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
      <View style={styles.inputContainer}>
        <Fields
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Buttons text="Register" onPress={handleRegister} />
      </View>
      <Pressable onPress={() => router.push('/LoginPage')}>
        <Text style={styles.signUpText}>Already have an account? LogIn</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 5,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  welcome: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 20,
    color: Colors.LIGHT_GRAY,
  },
  inputContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  signUpText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.PRIMARY,
  },
});
