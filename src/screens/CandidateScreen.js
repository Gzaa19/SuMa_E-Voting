import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderBadge from '../components/ui/HeaderBadge';
import SectionTitle from '../components/ui/SectionTitle';
import ModalDetail from '../components/ui/ModalDetail';

export default function CandidateScreen({ candidate, visible = true, onClose = () => {} }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeaderBadge />
      <SectionTitle>Detail Kandidat</SectionTitle>
      <ModalDetail visible={visible} candidate={candidate} onClose={onClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});
