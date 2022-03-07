import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA61g_rYbP6kWep_CJ9jOP3yx5VXVrLiWU",
  authDomain: "invoice-app-vue-e0a37.firebaseapp.com",
  projectId: "invoice-app-vue-e0a37",
  storageBucket: "invoice-app-vue-e0a37.appspot.com",
  messagingSenderId: "623807028915",
  appId: "1:623807028915:web:d6dd1adb2cf16fc73e9ac6",
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);
