// OtpVerify.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import OtpFields from '../components/OtpFields';

const API_URL = 'http://192.168.0.105:7788';

const VerifyEmail = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [countdown, setCountdown] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = typeof params.email === 'string' ? params.email : '';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            setIsResendDisabled(false);
          }
          return newCount;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleCodeChange = (newCode: string[]) => {
    setCode(newCode);
  };

  const handleVerifySubmit = async () => {
    const fullCode = code.join('');
    if (!email) {
      Alert.alert('Error', 'Missing email. Please go back and try again.');
      return;
    }
    if (fullCode.length !== 4) {
      Alert.alert('Invalid Code', 'Please enter a 4-digit verification code.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify`, {
        email,
        code: fullCode,
      });

      if (response.data.success) {
        Alert.alert(
          'Verified!',
          'Account verified successfully! Redirecting to signin...'
        );
        setTimeout(() => router.replace('/LoginPage'), 2000);
      } else {
        Alert.alert(
          'Verification Failed',
          response.data.error || 'Invalid code.'
        );
      }
    } catch (error: any) {
      console.error('Verify Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert('Error', error?.response?.data?.error || 'Server error.');
    }
  };

  const handleResendSubmit = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Please provide a valid email address.');
      return;
    }

    try {
      console.log('Sending resend OTP request with email:', email);
      const response = await axios.post(
        `${API_URL}/api/auth/resend-otp`,
        {
          email,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        Alert.alert('OTP Sent', 'New OTP sent successfully');
        setCountdown(60);
        setIsResendDisabled(true);
      } else {
        Alert.alert('Failed', response.data.error || 'Failed to resend OTP.');
      }
    } catch (error: any) {
      console.error('Resend OTP Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert('Error', error?.response?.data?.error || 'Server error.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.infoText}>
        Enter the 4-digit code sent to your email: {email}
      </Text>

      <OtpFields onCodeChange={handleCodeChange} />

      <TouchableOpacity style={styles.button} onPress={handleVerifySubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isResendDisabled && styles.disabledButton]}
        onPress={handleResendSubmit}
        disabled={isResendDisabled}
      >
        <Text style={styles.buttonText}>Resend OTP</Text>
      </TouchableOpacity>

      <Text style={styles.timerText}>
        {countdown > 0
          ? `Resend available in ${countdown} seconds`
          : 'Resend available now'}
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002d62',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#002d62',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  timerText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 10,
    fontSize: 14,
  },
});

export default VerifyEmail;
