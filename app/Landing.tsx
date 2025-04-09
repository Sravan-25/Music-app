import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/data/Colors';
import Button from '@/components/Buttons';

const { width } = Dimensions.get('window');

export default function Landing() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash1.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Own Your Data, Stay In Control</Text>
        <Text style={styles.description}>
          With Doc IT, store your important files securely on a home-based
          device, ensuring complete control over your data. No third-party
          interference your data stays with you.
        </Text>
        <Button text="Get Started" onPress={() => router.push('/LoginPage')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFDDFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: 350,
    marginTop: 40,
  },
  content: {
    marginTop: 30,
    gap: 25,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.PRIMARY,
    lineHeight: 22,
  },
});
