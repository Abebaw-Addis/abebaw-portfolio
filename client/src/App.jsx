import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "./components/admin/AdminDashboard";
import Navbar from "./components/layout/Navbar";
import { logout as logoutAction } from "./features/auth/authSlice";
import { setTheme } from "./features/ui/uiSlice";
import Home from "./pages/Home";

const allowedEmails = ["abadis1221@gmail.com", "dbu1402806@gmail.com", "dbu1402806@dbu.edu.et"];

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const [authorizedDevice, setAuthorizedDevice] = useState(null);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const email = localStorage.getItem("portfolio-device-email");
    if (email) {
      setAuthorizedDevice(email);
    }
  }, []);

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const defaultTheme =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    dispatch(setTheme(defaultTheme));
    document.documentElement.classList.toggle("dark", defaultTheme === "dark");
  }, [dispatch]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    setShowAdminLogin(params.get("admin") === "true");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleAuthorize = (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return false;
    }

    const isAllowed = allowedEmails.includes(normalizedEmail);

    if (isAllowed) {
      localStorage.setItem("portfolio-device-email", normalizedEmail);
      setAuthorizedDevice(normalizedEmail);
      setShowAdminLogin(true);
    }

    return isAllowed;
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio-device-email");
    setAuthorizedDevice(null);
    setShowAdminLogin(false);
    if (auth?.user) dispatch(logoutAction());
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        authorizedDevice={authorizedDevice}
        showAdminLogin={showAdminLogin}
        onAuthorize={handleAuthorize}
        onLogout={handleLogout}
      />
      {authorizedDevice || auth?.user ? (
        <AdminDashboard deviceEmail={authorizedDevice || auth.user?.email} onLogout={handleLogout} />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;