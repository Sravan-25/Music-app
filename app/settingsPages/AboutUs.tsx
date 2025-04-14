import React from 'react';
import { ScrollView, Text, StyleSheet, Image, View } from 'react-native';
import { aboutUs } from '@/data/SettingsData';
import BackButton from '@/components/BackButton';

export default function PrivacyPolicy() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <BackButton />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>About Us</Text>
        <Image
          source={require('@/assets/images/docit.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.text}>{aboutUs}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 65,
    backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#003366',
    marginBottom:20,
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    textAlign: 'justify',
  },
});
