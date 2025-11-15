import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function TextField({ label, value, onChangeText, ...props }) {
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 16,
  },
});
