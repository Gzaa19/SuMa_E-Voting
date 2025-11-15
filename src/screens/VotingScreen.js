import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
// 1. HAPUS useSafeAreaInsets dari 'react-native-safe-area-context'
import { SafeAreaView } from 'react-native-safe-area-context'; 
import HeaderBadge from '../components/ui/HeaderBadge';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import TextField from '../components/ui/TextField';
import CandidateCard from '../components/ui/CandidateCard';
import ModalDetail from '../components/ui/ModalDetail';
import AppAlert from '../components/ui/AppAlert';
import useAlert from '../hooks/useAlert';
import useVoting from '../hooks/useVoting';
import { candidates } from '../scripts/data/candidates';
import { useAuth } from '../hooks/useAuth';
import { syncCandidates } from '../services/candidateService';
import { getStudent } from '../services/studentService';

export default function VotingScreen() {
  // 2. HAPUS const insets = useSafeAreaInsets();
  
  const [nim, setNim] = useState('');
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const { showAlert, alertProps } = useAlert();
  const { votes, handleVote } = useVoting(showAlert);
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const openDetail = (c) => {
    setSelected(c);
    setVisible(true);
  };

  useEffect(() => {
    syncCandidates(candidates);
  }, []);

  useEffect(() => {
    const run = async () => {
      if (user) {
        const s = await getStudent(user.uid);
        setProfile(s);
      } else {
        setProfile(null);
      }
    };
    run();
  }, [user]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* 3. KEMBALIKAN contentContainerStyle ke styles.content (tanpa array) */}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <HeaderBadge />
        <SectionTitle>Pemilihan Ketua Himpunan{"\n"}2025</SectionTitle>

        {user && (
          <Card title={`Selamat datang, ${profile?.nama || user.email}`}></Card>
        )}

        <TextField
          label="Masukkan NIM/ID Pemilih:"
          placeholder="24060123140183"
          value={nim}
          onChangeText={setNim}
          keyboardType="number-pad"
          maxLength={14}
        />

        <View style={styles.row}>
          {candidates.map((c) => (
            <CandidateCard
              key={c.key}
              image={c.image}
              name={c.name}
              onVote={async () => {
                const ok = await handleVote(c.key, nim.trim());
                if (ok) setNim('');
              }}
              onDetail={() => openDetail(c)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Card title="Hasil Sementara" style={styles.footerCard}>
            <View style={styles.resultRow}>
              <Text style={styles.resultName}>{candidates[0].name}</Text>
              <Text style={styles.resultVote}>{votes.c1} suara</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultName}>{candidates[1].name}</Text>
              <Text style={styles.resultVote}>{votes.c2} suara</Text>
            </View>
          </Card>
        </View>

        <ModalDetail visible={visible} candidate={selected} onClose={() => setVisible(false)} />
        <AppAlert {...alertProps} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 4. KEMBALIKAN safe backgroundColor ke abu-abu
  safe: { flex: 1, backgroundColor: '#f5f5f7' }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 36,
    paddingHorizontal: 20,
    flexGrow: 1,
    // 5. TAMBAHKAN paddingBottom statis
    // 50px (tinggi tab bar) + 20px (margin) = 70px
    paddingBottom: 70, 
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  footer: {
    marginTop: 24,
  },
  footerCard: {
    marginBottom: 0,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  resultName: {
    color: '#333',
    fontSize: 16,
  },
  resultVote: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});