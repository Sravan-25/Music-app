import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/data/Colors';
import FloatingNavbar from '@/components/NavBar';

export default function SharedAccess() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shared Access</Text>
      <FloatingNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: Colors.PRIMARY,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
