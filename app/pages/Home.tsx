import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import FloatingNavbar from '@/components/NavBar';
import Search from '@/components/Search';
import TopNav from '@/components/TopNav';

export default function Home() {
  return (
    <View style={styles.container}>
      <TopNav />

      <ScrollView style={styles.scrollContainer}>
        <Search />
      </ScrollView>

      <FloatingNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
