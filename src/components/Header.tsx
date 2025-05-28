import { Moon, Sun } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDarkMode } from "../utils/themeContext";

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const { darkMode, setDarkMode } = useDarkMode();

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        TodoPro
      </h1>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => setDarkMode((prev: boolean) => !prev)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <button
          onClick={handleLogout}
          className="px-3 sm:px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-sm sm:text-base"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
