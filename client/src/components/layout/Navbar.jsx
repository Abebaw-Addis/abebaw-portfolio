import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction, logout as logoutAction } from "../../features/auth/authSlice";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ theme, toggleTheme, authorizedDevice, showAdminLogin, onAuthorize, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const shouldShowAdminLogin = Boolean(showAdminLogin) || Boolean(authorizedDevice);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (showAdminLogin) {
      // perform real auth against backend
      try {
        await dispatch(loginAction({ email, password })).unwrap();
        setLoginError("");
        setEmail("");
        setPassword("");
      } catch (err) {
        setLoginError(err || "Login failed");
      }
      return;
    }

    const ok = onAuthorize(email);
    if (!ok) {
      setLoginError("Only authorized device emails can access the dashboard.");
      return;
    }

    setLoginError("");
    setEmail("");
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/10 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold text-sky-600 dark:text-cyan-300">
          Abebaw
        </a>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "×" : "≡"}
        </button>

        <div className="hidden items-center gap-4 text-sm text-slate-700 dark:text-slate-300 md:flex md:gap-6">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-slate-900 dark:hover:text-white">
              {item.label}
            </a>
          ))}
          {shouldShowAdminLogin ? (
            authorizedDevice || auth?.user ? (
              <button
                type="button"
                onClick={() => {
                  // support both device logout and auth logout
                  if (auth?.user) dispatch(logoutAction());
                  onLogout();
                }}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
              >
                Logout
              </button>
            ) : (
              <form onSubmit={handleLogin} className="flex items-center gap-2">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                {showAdminLogin ? (
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    type="password"
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                ) : null}
                <button type="submit" className="rounded-full bg-sky-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
                  Login
                </button>
              </form>
            )
          ) : null}
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200/80 bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            type="button"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM15.657 4.343a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM15.657 15.657a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707a1 1 0 010 1.414zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.343 15.657a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM3 9a1 1 0 110 2H2a1 1 0 110-2h1zM4.343 4.343a1 1 0 011.414 0l.707.707A1 1 0 015.05 6.464l-.707-.707a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M17.293 13.293A8 8 0 116.707 2.707 7 7 0 0017.293 13.293z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`${open ? "block" : "hidden"} border-t border-slate-200/10 bg-white/95 py-4 dark:border-slate-700 dark:bg-slate-950/95 md:hidden`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-slate-700 dark:text-slate-200">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block rounded-xl px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {shouldShowAdminLogin ? (
            authorizedDevice ? (
              <button type="button" onClick={onLogout} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
                Logout
              </button>
              ) : (
              <form onSubmit={handleLogin} className="mt-2 flex flex-col gap-2">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                {showAdminLogin ? (
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    type="password"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                ) : null}
                <button type="submit" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
                  Login
                </button>
              </form>
            )
          ) : null}
          {loginError || auth?.message ? <p className="text-sm text-red-500">{loginError || auth?.message}</p> : null}
          <button
            onClick={() => {
              setOpen(false);
              toggleTheme();
            }}
            className="rounded-full border border-slate-200/80 bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            type="button"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM15.657 4.343a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM15.657 15.657a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707a1 1 0 010 1.414zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.343 15.657a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM3 9a1 1 0 110 2H2a1 1 0 110-2h1zM4.343 4.343a1 1 0 011.414 0l.707.707A1 1 0 015.05 6.464l-.707-.707a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M17.293 13.293A8 8 0 116.707 2.707 7 7 0 0017.293 13.293z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;