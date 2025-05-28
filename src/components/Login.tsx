import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import {FcGoogle} from "react-icons/fc"

interface LoginProps {
  onLogin: (userId: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
    }));
    onLogin(user.uid);
    window.location.reload(); // Reload to ensure UI updates
  } catch {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
    }));
    onLogin(user.uid);
    window.location.reload(); // Reload to ensure UI updates
  }
};


const handleGoogleLogin = async () => {
  try {
    const userCred = await signInWithPopup(auth, googleProvider);
    const user = userCred.user;
    // Store user info in localStorage
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }));
    onLogin(user.uid);
  } catch (error) {
    console.error("Google login failed", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md space-y-4 w-80">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login / Register
        </button>
        <div className="text-center">OR</div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-evenly bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          <FcGoogle /> Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
