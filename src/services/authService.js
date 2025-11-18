import { auth, db } from '../config/firebase';
import { getUser, setUser, removeUser } from '../config/storage';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const getSavedUser = () => {
  return getUser();
};

export const subscribeAuth = (cb) => {
  return onAuthStateChanged(auth, (u) => {
    if (u) {
      setUser({ uid: u.uid, email: u.email });
      cb(u);
    } else {
      removeUser();
      cb(null);
    }
  });
};

export const login = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const u = res.user;
  setUser({ uid: u.uid, email: u.email });
  return u;
};

export const logout = async () => {
  await signOut(auth);
  removeUser();
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
    setUser({ uid: u.uid, email: u.email });
    return u;
  } catch (e) {
    console.error('register error:', e);
    throw e;
  }
};