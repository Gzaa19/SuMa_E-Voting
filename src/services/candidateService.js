import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const syncCandidates = async (items) => {
  for (const c of items) {
    await setDoc(doc(db, 'Kandidat', c.key), {
      key: c.key,
      name: c.name,
      visi: c.visi,
      misi: c.misi,
    });
  }
};