import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await apiPost("/auth/login", { email, password });
    alert("Login successful (demo only)");
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Login
        </h1>

        {/* Email */}
        <label className="text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mt-1 bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
