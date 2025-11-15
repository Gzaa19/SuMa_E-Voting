import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function CandidateCard({ image, name, onVote, onDetail }) {
  return (
    <View style={styles.cardCandidate}>
      <Image source={image} style={styles.candidateImage} />
      <Text style={styles.candidateName}>{name}</Text>
      <View style={styles.buttonWrapRed}>
        <Button title="Vote" color="#e53935" onPress={onVote} />
      </View>
      <View style={styles.buttonWrapBlue}>
        <Button title="Lihat Detail" color="#1e88e5" onPress={onDetail} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCandidate: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  candidateImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  buttonWrapRed: {
    backgroundColor: '#ffcdd2',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  buttonWrapBlue: {
    backgroundColor: '#bbdefb',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
