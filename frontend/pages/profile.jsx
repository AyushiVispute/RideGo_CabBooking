"use client";

import { useEffect, useState } from "react";
import { FiEdit, FiLogOut, FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Ayushi Vispute",
    email: "ayushi@example.com",
    phone: "+91 9XXXXXXXXX",
    totalRides: 12,
    totalSpent: 2450,
  });

  // 🔐 Protect route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center p-6">
      <div className="w-full max-w-xl text-black dark:text-white">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6">

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-black dark:bg-white 
                            text-white dark:text-black flex items-center 
                            justify-center text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
          </div>

          {/* Name */}
          <h2 className="text-xl font-semibold text-center mb-6">
            {user.name}
          </h2>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiMail className="opacity-70" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="opacity-70" />
              <span>{user.phone}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-100 dark:bg-black rounded-xl p-4 text-center">
              <p className="text-sm opacity-70">Total Rides</p>
              <p className="text-xl font-bold">{user.totalRides}</p>
            </div>

            <div className="bg-gray-100 dark:bg-black rounded-xl p-4 text-center">
              <p className="text-sm opacity-70">Total Spent</p>
              <p className="text-xl font-bold">₹{user.totalSpent}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 flex items-center justify-center gap-2 
                         bg-black text-white dark:bg-white dark:text-black 
                         py-2 rounded-xl font-semibold hover:opacity-90"
            >
              <FiEdit /> Edit Profile
            </button>

            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-2 
                         bg-red-600 text-white py-2 rounded-xl 
                         hover:bg-red-700"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
