const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold text-blue-500">
          Abebaw
        </a>

        <ul className="flex items-center gap-4 text-sm text-gray-300 md:gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;