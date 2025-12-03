"use client";
import { useState } from "react";
import Link from "next/link";
import { FiHome, FiUser, FiMenu, FiX, FiBell } from "react-icons/fi";
import { BsClockHistory } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3); // example unread count

   const toggleDark = () => {
    const root = document.documentElement;

    const isDark = root.style.getPropertyValue("--background") === "#0a0a0a";

    if (isDark) {
      // Switch to Light Mode
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
      setDarkMode(false);
    } else {
      // Switch to Dark Mode
      root.style.setProperty("--background", "#0a0a0a");
      root.style.setProperty("--foreground", "#ededed");
      setDarkMode(true);
    }
  };


  return (
    <nav className="w-full bg-black text-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">

      {/* Left Logo */}
      <Link href="/" className="text-2xl font-bold">
        RideGo
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">

        {/* Home */}
        <Link href="/" className="flex items-center gap-1 hover:text-gray-300">
          <FiHome size={18} /> Home
        </Link>

        {/* History */}
        <Link href="/history" className="flex items-center gap-1 hover:text-gray-300">
          <BsClockHistory size={18} /> History
        </Link>

        {/* Notification Bell */}
        <div className="relative cursor-pointer hover:text-gray-300">
          <FiBell size={20} />
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDark} className="hover:text-gray-300">
          {darkMode ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1 hover:text-gray-300"
          >
            <FiUser size={18} />
            Profile ▼
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-xl shadow-lg p-2">
              <Link href="/profile" className="block p-2 rounded hover:bg-gray-200">My Profile</Link>
              <Link href="/history" className="block p-2 rounded hover:bg-gray-200">My Rides</Link>
              <Link href="/payment" className="block p-2 rounded hover:bg-gray-200">Payments</Link>
              <button className="w-full text-left p-2 rounded hover:bg-gray-200">Logout</button>
            </div>
          )}
        </div>

        {/* Book Ride Button */}
        <Link
          href="/home"
          className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200"
        >
          Book Ride
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-2/3 h-full bg-black text-white p-6 shadow-xl z-50">

          {/* Close */}
          <button className="mb-5" onClick={() => setMenuOpen(false)}>
            <FiX size={28} />
          </button>

          <div className="flex flex-col gap-4 text-lg">

            <Link href="/" className="flex items-center gap-2">
              <FiHome /> Home
            </Link>

            <Link href="/history" className="flex items-center gap-2">
              <BsClockHistory /> History
            </Link>

            <Link href="/profile" className="flex items-center gap-2">
              <FiUser /> Profile
            </Link>

            <Link href="/payment" className="flex items-center gap-2">
              💳 Payments
            </Link>

            <Link
              href="/home"
              className="bg-white text-black px-4 py-2 rounded-full font-semibold mt-4 text-center"
            >
              Book Ride
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
