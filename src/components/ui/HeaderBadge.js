import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderBadge({ text = 'SuMa' }) {
  return (
    <View style={styles.headerBadge}>
      <Text style={styles.headerBadgeText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBadge: {
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
    marginTop: 12,
    marginBottom: 10,
  },
  headerBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
