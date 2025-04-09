import React from 'react';
import { Image, ImageStyle, StyleSheet, View, ImageSourcePropType } from 'react-native';

interface ImageComponentProps {
  source: ImageSourcePropType; 
  style?: ImageStyle;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ source, style }) => {
  if (!source) {
    console.warn('ImageComponent: Source is invalid or undefined');
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={source} style={[styles.image, style]} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageComponent;