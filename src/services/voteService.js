import { db } from '../config/firebase';
import { collection, query, where, orderBy, limit, getDocs, doc, setDoc, getCountFromServer, getDoc, serverTimestamp } from 'firebase/firestore';

export const getAllVoters = async () => {
  const q = query(collection(db, 'Voting'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getVotersByCandidate = async (candidateKey) => {
  const q = query(
    collection(db, 'votes'),
    where('candidateKey', '==', candidateKey),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getVoterByNim = async (nim) => {
  const d = await getDoc(doc(db, 'votes', String(nim)));
  return d.exists() ? { id: d.id, ...d.data() } : null;
};

export const hasUserVoted = async (uid) => {
  const q = query(collection(db, 'votes'), where('voterUid', '==', uid), limit(1));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const submitVote = async ({ candidateKey, voterUid, voterEmail, nim, jurusan, angkatan }) => {
  await setDoc(doc(db, 'votes', String(nim)), {
    nim: String(nim),
    voterUid,
    voterEmail,
    jurusan: jurusan || '',
    angkatan: angkatan || '',
    candidateKey,
    createdAt: serverTimestamp(),
  });
};

export const getVoteCounts = async () => {
  const c1 = await getCountFromServer(query(collection(db, 'votes'), where('candidateKey', '==', 'c1')));
  const c2 = await getCountFromServer(query(collection(db, 'votes'), where('candidateKey', '==', 'c2')));
  return { c1: c1.data().count, c2: c2.data().count };
};

export const isNimUsed = async (nim) => {
  const d = await getDoc(doc(db, 'votes', String(nim)));
  return d.exists();
};