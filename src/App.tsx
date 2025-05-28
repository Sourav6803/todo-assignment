import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import TodoPage from "./components/TodoPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { ThemeProvider } from "./utils/themeContext";

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("storedUser", storedUser);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      setUserId(user.uid);
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserId(null);
    window.location.reload();
  };

  return (
    <ThemeProvider>
      <>
        {!userId ? (
          <Login onLogin={setUserId} />
        ) : (
          <>
            <Header onLogout={handleLogout} />
            <TodoPage userId={userId} user={user} />
          </>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </>
     
    </ThemeProvider>
  );
}

export default App;
