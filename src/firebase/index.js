import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBsKu7kunOkhF4zaJBKtUJXYWim4Kjn2-4",
  authDomain: "e-commerce-d4b11.firebaseapp.com",
  projectId: "e-commerce-d4b11",
  storageBucket: "e-commerce-d4b11.appspot.com",
  messagingSenderId: "998114096599",
  appId: "1:998114096599:web:f2cc1b58e036d8ab270792",
  measurementId: "G-8DJ922PGKH",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const auth = getAuth();
auth.languageCode = "it";
export { auth, app };
