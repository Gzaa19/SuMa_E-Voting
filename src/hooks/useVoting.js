import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getVoteCounts, submitVote, isNimUsed, hasUserVoted } from '../services/voteService';
import { getStudent } from '../services/studentService';

export default function useVoting(showAlert) {
  const [votes, setVotes] = useState({ c1: 0, c2: 0 });
  const { user } = useAuth();
  const [student, setStudent] = useState(null);

  const load = async () => {
    const c = await getVoteCounts();
    setVotes(c);
  };

  useEffect(() => {
    const run = async () => {
      if (user) {
        try {
          const s = await getStudent(user.uid);
          setStudent(s);
          await load();
        } catch {}
      } else {
        setStudent(null);
      }
    };
    run();
  }, [user]);

  const handleVote = async (key, nim) => {
    if (!user) {
      showAlert('Login Diperlukan', 'Silakan login terlebih dahulu.', [{ text: 'OK' }]);
      return false;
    }
    if (!/^\d{14}$/.test(String(nim))) {
      showAlert('Validasi Gagal', 'Harap masukkan NIM Anda dengan benar (14 digit).', [{ text: 'OK' }]);
      return false;
    }
    const nimAlready = await isNimUsed(nim);
    if (nimAlready) {
      showAlert('NIM Sudah Digunakan', 'NIM ini sudah dipakai untuk voting.', [{ text: 'OK' }]);
      return false;
    }
    const userAlready = await hasUserVoted(user.uid);
    if (userAlready) {
      showAlert('User Sudah Voting', 'Akun ini sudah memberikan suara dengan NIM lain.', [{ text: 'OK' }]);
      return false;
    }
    await submitVote({ candidateKey: key, voterUid: user.uid, voterEmail: user.email, nim, jurusan: student?.jurusan, angkatan: student?.angkatan });
    showAlert('Terima Kasih!', 'Suara Anda telah dicatat.', [{ text: 'OK' }]);
    try {
      await load();
    } catch {}
    return true;
  };

  return { votes, handleVote };
}