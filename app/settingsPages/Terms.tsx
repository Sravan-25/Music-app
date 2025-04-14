// PrivacyPolicy.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet, Image, View } from 'react-native';
import { termsOfUse } from '@/data/SettingsData';
import BackButton from '@/components/BackButton';

export default function PrivacyPolicy() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.title}>Terms of Use</Text>
        <Image
          source={require('@/assets/images/docit.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.text}>{termsOfUse}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 35,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
});
