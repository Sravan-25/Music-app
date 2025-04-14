// PrivacyPolicy.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet, Image, View } from 'react-native';
import { privacyPolicy } from '@/data/SettingsData';
import BackButton from '@/components/BackButton';

export default function PrivacyPolicy() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Image
          source={require('@/assets/images/docit.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.text}>{privacyPolicy}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003366',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
});
