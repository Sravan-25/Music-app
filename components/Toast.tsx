import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onDismiss?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 2000,
  onDismiss,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (onDismiss) onDismiss();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, duration, onDismiss]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, pointerEvents: 'auto' as const }, 
        type === 'success' ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  success: {
    backgroundColor: '#28a745',
  },
  error: {
    backgroundColor: '#dc3545',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Toast;
