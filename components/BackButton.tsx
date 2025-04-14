import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBack} style={styles.button}>
      <Image source={require('@/assets/images/back.png')} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
