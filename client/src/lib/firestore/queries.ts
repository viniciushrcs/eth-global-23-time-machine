import db from './firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from 'firebase/firestore';

const parentsRef = collection(db, 'parents');
const capsuleRef = collection(db, 'capsules');
const childsRef = collection(db, 'childs');

export async function getParentByEmail(email: string) {
  const q = query(parentsRef, where('email', '==', email));
  const querySnapshot = (await getDocs(q)).docs[0];
  return querySnapshot.data();
}

export async function getChildsByParent(email: string) {
  const parent = await getParentByEmail(email);
  const q = query(childsRef, where('parentId', '==', parent.id));
  const querySnapshot = (await getDocs(q)).docs[0];
  return querySnapshot.data();
}

export async function getCapsulesByChild(childId: string) {
  const q = query(capsuleRef, where('childId', '==', childId));
  const querySnapshot = (await getDocs(q)).docs[0];
  return querySnapshot.data();
}

export async function getAllCapsules() {
  const querySnapshot = await getDocs(capsuleRef);
  const capsules = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return capsules;
}

export async function getCapsulesByParentAddress(parentAddress: string) {
  const q = query(capsuleRef, where('creatorAddress', '==', parentAddress));
  const querySnapshot = (await getDocs(q)).docs;
  return querySnapshot.map((doc) => doc.data());
}

export async function createChild(childData: any) {
  try {
    await setDoc(doc(childsRef), childData);
  } catch (error) {
    console.error('Error adding document', error);
  }
}

export async function createParent(parentData: any) {
  try {
    await setDoc(doc(parentsRef), parentData);
  } catch (error) {
    console.error('Error adding document with ID: ', error);
  }
}

export async function createCapsule(capsuleData: any) {
  try {
    await setDoc(doc(capsuleRef), capsuleData);
  } catch (error) {
    console.error('Error adding document with ID: ', error);
  }
}
