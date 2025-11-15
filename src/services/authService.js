import { auth, db } from '../config/firebase';
import { storage } from '../config/storage';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const getSavedUser = async () => {
  const saved = await storage.getString('user');
  return saved ? JSON.parse(saved) : null;
};

export const subscribeAuth = (cb) => {
  return onAuthStateChanged(auth, (u) => {
    if (u) {
      storage.set('user', JSON.stringify({ uid: u.uid, email: u.email }));
      cb(u);
    } else {
      storage.delete('user');
      cb(null);
    }
  });
};

export const login = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const u = res.user;
  await storage.set('user', JSON.stringify({ uid: u.uid, email: u.email }));
  return u;
};

export const logout = async () => {
  await signOut(auth);
  await storage.delete('user');
};

export const register = async (email, password, profile) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const u = res.user;
    // create students document with same uid (Firestore will create the collection if needed)
    await setDoc(doc(db, 'students', u.uid), {
      uid: u.uid,
      email: u.email,
      nama: profile?.nama ?? null,
      jurusan: profile?.jurusan ?? null,
      angkatan: profile?.angkatan ?? null,
      createdAt: serverTimestamp(),
    });
    await storage.set('user', JSON.stringify({ uid: u.uid, email: u.email }));
    return u;
  } catch (e) {
    console.error('register error:', e);
    throw e;
  }
};