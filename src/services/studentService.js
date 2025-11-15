import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export const getStudent = async (uid) => {
  const s = await getDoc(doc(db, 'students', uid));
  return s.exists() ? s.data() : null;
};

export const getAllStudents = async () => {
  const snapshot = await getDocs(collection(db, 'students'));
  const students = [];
  snapshot.forEach((d) => {
    students.push({ id: d.id, ...d.data() });
  });
  return students;
};