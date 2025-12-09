"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiHome, FiUser, FiMenu, FiX, FiBell } from "react-icons/fi";
import { BsClockHistory } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3);

  // Save theme in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDark = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <nav
      className={`w-full shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50 transition-all duration-300
      ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
    >
      {/* Brand */}
      <Link href="/" className="text-2xl font-bold">
        RideGo
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">

        {/* Home */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-70">
          <FiHome size={18} /> Home
        </Link>

        {/* History */}
        <Link href="/history" className="flex items-center gap-2 hover:opacity-70">
          <BsClockHistory size={18} /> History
        </Link>

        {/* Bell Notification */}
        <div className="relative cursor-pointer hover:opacity-70">
          <FiBell size={20} />
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDark} className="hover:opacity-70 transition">
          {darkMode ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 hover:opacity-70"
          >
            <FiUser size={18} />
            Profile ▼
          </button>

          {profileOpen && (
            <div
              className={`absolute right-0 mt-3 w-44 rounded-xl shadow-lg p-2 border transition
              ${darkMode ? "bg-black text-white border-gray-700" : "bg-white text-black border-gray-200"}`}
            >
              <Link href="/profile" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                My Profile
              </Link>
              <Link href="/history" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                My Rides
              </Link>
              <Link href="/payment" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                Payments
              </Link>
              <button className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Book Ride Button */}
        <Link
          href="/home"
          className={`px-4 py-2 rounded-full font-semibold transition 
          ${darkMode ? "bg-black text-white hover:bg-gray-900" : "bg-white text-black hover:bg-gray-200"}`}
        >
          Book Ride
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden fixed top-0 left-0 w-2/3 h-full shadow-xl p-6 z-50 transition-all 
          ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
        >
          {/* Close Button */}
          <button className="mb-5" onClick={() => setMenuOpen(false)}>
            <FiX size={28} />
          </button>

          {/* Menu Items */}
          <div className="flex flex-col gap-5 text-lg">
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

            {/* Book Ride */}
            <Link
              href="/home"
              className={`px-4 py-2 rounded-full font-semibold mt-4 text-center
              ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
            >
              Book Ride
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}