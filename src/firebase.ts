// firebase.ts or firebaseConfig.ts

// ✅ Value imports
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Type-only imports
import type { FirebaseApp } from "firebase/app";
import type { Auth,   } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAsVniyPQqNuFGKJzB0XFARGyXdxbfBIak",
  authDomain: "todo-app-be591.firebaseapp.com",
  projectId: "todo-app-be591",
  storageBucket: "todo-app-be591.appspot.com", // corrected .app -> .appspot.com
  messagingSenderId: "1071876384079",
  appId: "1:1071876384079:web:ef2b4563ed7458dc44513a",
  measurementId: "G-B4RKKLDRG5",
};

// ✅ Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { app, auth };
