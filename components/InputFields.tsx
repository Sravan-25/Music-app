import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '@/data/Colors';

type FieldProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

const Fields: React.FC<FieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  placeholder,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={Colors.DARK_GRAY}
        autoCapitalize="none"
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.BLACK,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.Field_Color,
    color: Colors.BLACK,
    fontSize: 16,
    height: 60,
  },
});

export default Fields;
