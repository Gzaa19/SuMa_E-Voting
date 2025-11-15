import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email tidak valid');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    setLoading(true);
    const u = await login(email, password);
    if (!u) setError('Login gagal, periksa kredensial');
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandLine}><Text style={styles.brandSu}>Su</Text><Text style={styles.brandMa}>Ma</Text></Text>
              <Text style={styles.subLine}><Text style={styles.subSu}>Suara</Text> <Text style={styles.subMa}>Mahasiswa</Text></Text>
            </View>

            <Text style={styles.formTitle}>Login</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity style={styles.eye} onPress={() => setShowPass(s => !s)}>
                {showPass ? (
                  <Ionicons name="eye-off" size={20} color="#555" />
                ) : (
                  <Ionicons name="eye" size={20} color="#555" />
                )}
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.buttonBlue} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Masuk</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.switchWrap} onPress={onSwitchToRegister}>
              <Text style={styles.switchText}>Belum punya akun? Daftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    alignSelf: 'center',
    width: '100%',
  },
  formTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 12, textAlign: 'center' },
  inputWrap: { marginBottom: 12 },
  input: {
    height: 48,
    backgroundColor: '#f7f7f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#333',
  },
  inputPassword: {
    height: 48,
    backgroundColor: '#f7f7f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#333',
    paddingRight: 40,
  },
  eye: { position: 'absolute', right: 12, top: 14 },
  error: { color: '#d32f2f', textAlign: 'center', marginBottom: 12 },
  buttonBlue: {
    backgroundColor: '#1e88e5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  switchWrap: { marginTop: 12, alignItems: 'center' },
  switchText: { color: '#1e88e5', fontWeight: '600' },
  brandBadge: {
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginBottom: 10,
    alignItems: 'center',
  },
  brandLine: { fontSize: 20, fontWeight: '700' },
  brandSu: { color: '#d32f2f' },
  brandMa: { color: '#fff' },
  subLine: { marginTop: 2 },
  subSu: { color: '#d32f2f' },
  subMa: { color: '#fff' },
});
