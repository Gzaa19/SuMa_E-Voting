import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function SectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
});
