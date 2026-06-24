import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnvHJZsdRGoFbCQPyFMmxUpTvbTxXmKts",
  authDomain: "guzo-go-visa-verificatio-bc467.firebaseapp.com",
  projectId: "guzo-go-visa-verificatio-bc467",
  storageBucket: "guzo-go-visa-verificatio-bc467.firebasestorage.app",
  messagingSenderId: "499782903724",
  appId: "1:499782903724:web:9fca41ea06d580fee7fc09"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
