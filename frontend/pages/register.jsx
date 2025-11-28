import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await apiPost("/auth/register", {
      name,
      email,
      phone,
      password,
    });

    alert("Registration successful (demo)");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create Account
        </h1>

        {/* Full Name */}
        <label className="text-gray-700">Full Name</label>
        <input
          className="w-full border p-2 rounded mt-1 bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <label className="mt-4 block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mt-1 bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone */}
        <label className="mt-4 block text-gray-700">Phone</label>
        <input
          type="number"
          className="w-full border p-2 rounded mt-1 bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="9876543210"
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Password */}
        <label className="mt-4 block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mt-1 bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          className="w-full bg-black text-white p-3 rounded-xl mt-6 hover:bg-gray-900 transition"
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
