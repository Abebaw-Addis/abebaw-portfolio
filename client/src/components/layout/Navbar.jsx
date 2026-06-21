const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-gray-950/70 backdrop-blur border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-bold text-blue-500">
          Abebaw
        </h1>

        <ul className="flex gap-6 text-gray-300">
          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer">About</li>
          <li className="hover:text-white cursor-pointer">Projects</li>
          <li className="hover:text-white cursor-pointer">Contact</li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;