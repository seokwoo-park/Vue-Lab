import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// dotenv.config();

const firebaseConfig = {
  apiKey: import.meta.env.VUE_APP_FIREBASE,
  authDomain: "invoice-app-vue-e0a37.firebaseapp.com",
  projectId: "invoice-app-vue-e0a37",
  storageBucket: "invoice-app-vue-e0a37.appspot.com",
  messagingSenderId: "623807028915",
  appId: "1:623807028915:web:d6dd1adb2cf16fc73e9ac6",
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);
