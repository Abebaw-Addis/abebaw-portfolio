import { useSelector } from "react-redux";

const Footer = () => {
  const { profiles = [] } = useSelector((state) => state.profile);

  const getProfileValue = (key, fallback = "") => {
    const entry = profiles.find((item) => item?.key === key);
    if (!entry) {
      return fallback;
    }

    if (Array.isArray(entry.value)) {
      return entry.value.join(", ").trim();
    }

    return entry.value ?? fallback;
  };

  const fullName = getProfileValue("fullName");
  const email = getProfileValue("email");
  const github = getProfileValue("github");
  const linkedin = getProfileValue("linkedin");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: github, label: "GitHub", icon: "⌘" },
    { href: linkedin, label: "LinkedIn", icon: "in" },
    { href: `mailto:${email}`, label: "Email", icon: "✉" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 text-slate-700 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Portfolio</p>
          <p className="mt-2 text-sm">{email}</p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">© {currentYear} {fullName}. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a href="#home" className="rounded-full px-3 py-2 transition hover:bg-slate-200 hover:text-sky-600 dark:hover:bg-slate-800">Home</a>
          <a href="#projects" className="rounded-full px-3 py-2 transition hover:bg-slate-200 hover:text-sky-600 dark:hover:bg-slate-800">Projects</a>
          <a href="#contact" className="rounded-full px-3 py-2 transition hover:bg-slate-200 hover:text-sky-600 dark:hover:bg-slate-800">Contact</a>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-base font-semibold text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
