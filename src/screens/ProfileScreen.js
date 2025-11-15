import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBadge from '../components/ui/HeaderBadge';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { getStudent } from '../services/studentService';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

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
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 12 }]}>
        <HeaderBadge />
        <SectionTitle>Profil Pribadi</SectionTitle>

        <Card title={`Selamat datang, ${profile?.nama || user?.email || ''}`}></Card>

        <Card title="Data Terdaftar">
          <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{user?.email || '-'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Nama</Text><Text style={styles.value}>{profile?.nama || '-'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Jurusan</Text><Text style={styles.value}>{profile?.jurusan || '-'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Angkatan</Text><Text style={styles.value}>{profile?.angkatan || '-'}</Text></View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingTop: 36, paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label: { color: '#333', fontWeight: '600' },
  value: { color: '#000', fontWeight: '700' },
});