import React from 'react';
import { View, Text, Image, Button, Modal, StyleSheet } from 'react-native';

export default function ModalDetail({ visible, candidate, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          {candidate && (
            <>
              <Image source={candidate.image} style={styles.modalImage}/>
              <Text style={styles.modalName}>{candidate.name}</Text>
              <Text style={styles.modalId}>{candidate.id}</Text>
              <View style={styles.modalInfoCard}>
                <Text style={styles.modalSectionTitle}>Visi</Text>
                <Text style={styles.modalText}>{candidate.visi}</Text>
                <Text style={styles.modalSectionTitle}>Misi</Text>
                {candidate.misi.map((m, idx) => (
                  <Text key={idx} style={styles.modalText}>• {m}</Text>
                ))}
              </View>
              <View style={styles.buttonWrapBlue}>
                <Button title="Tutup" color="#1e88e5" onPress={onClose} />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  modalImage: {
    width: '85%',
    height: 200,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  modalId: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  modalInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 14,
  },
  modalSectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  modalText: {
    color: '#333',
    marginBottom: 4,
  },
  buttonWrapBlue: {
    backgroundColor: '#bbdefb',
    borderRadius: 10,
    overflow: 'hidden',
  },
});