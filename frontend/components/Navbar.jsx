import { FiHome, FiClock, FiUser } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white py-4 shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-5">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight cursor-pointer">
          RideGo
        </h1>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-6 text-gray-300 text-lg">

          <a href="/home" className="flex items-center gap-2 hover:text-white transition">
            <FiHome className="text-xl" />
            <span className="hidden sm:inline">Home</span>
          </a>

          <a href="/history" className="flex items-center gap-2 hover:text-white transition">
            <FiClock className="text-xl" />
            <span className="hidden sm:inline">History</span>
          </a>

          <a href="/profile" className="flex items-center gap-2 hover:text-white transition">
            <FiUser className="text-xl" />
            <span className="hidden sm:inline">Profile</span>
          </a>

        </div>
      </div>
    </nav>
  );
}
