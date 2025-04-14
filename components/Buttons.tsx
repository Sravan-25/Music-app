import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/data/Colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Buttons({ text, onPress, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        marginBottom: 30,
        borderRadius: 40,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: Colors.WHITE,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
