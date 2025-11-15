import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

export default function AppAlert({ visible, title, message, actions = [{ text: 'OK' }], onRequestClose }) {
  const handlePress = (action) => {
    if (action && typeof action.onPress === 'function') action.onPress();
    if (typeof onRequestClose === 'function') onRequestClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.buttonsRow}>
            {actions.map((a, idx) => (
              <View key={idx} style={[styles.buttonWrap, a.style === 'cancel' ? styles.red : styles.blue]}>
                <Button title={a.text || 'OK'} color={a.style === 'cancel' ? '#e53935' : '#1e88e5'} onPress={() => handlePress(a)} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  message: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonWrap: {
    borderRadius: 10,
    overflow: 'hidden',
    minWidth: 120,
  },
  red: {
    backgroundColor: '#ffcdd2',
  },
  blue: {
    backgroundColor: '#bbdefb',
  },
});
