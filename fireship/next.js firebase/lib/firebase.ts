// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  collection,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  getFirestore,
  limit,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA9haHAn0kWrUdSGw_st8XKAtr2VOzReLs",
  authDomain: "nextfire-8d438.firebaseapp.com",
  projectId: "nextfire-8d438",
  storageBucket: "nextfire-8d438.appspot.com",
  messagingSenderId: "496720327172",
  appId: "1:496720327172:web:0d53fc768ca81d8358bb51",
  measurementId: "G-P298STWXSW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = (await isSupported()) ? getAnalytics(app) : undefined;
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export const googleAuthProvider = new GoogleAuthProvider();

export const getUserWithUsername = async (username: string) => {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
};

export const postToJson = (
  doc: DocumentSnapshot<DocumentData> | QueryDocumentSnapshot<DocumentData>
) => {
  const data = doc.data();

  return {
    ...data,
    createdAt: data?.createdAt.toMillis(),
    updatedAt: data?.updatedAt.toMillis(),
  };
};
