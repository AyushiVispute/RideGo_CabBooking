import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    setLoading(true);

    try {
      const res = await apiPost("/auth/login", {
        email,
        password,
      });

      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", email);

        alert("Login Successful!");
        window.location.href = "/home";
      } else {
        alert(res.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 shadow-2xl rounded-3xl w-full max-w-md border border-gray-200 transition-all">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to continue your journey
        </p>

        {/* Email */}
        <label className="text-gray-700 font-medium">Email</label>
        <input
          type="email"
          className="w-full border p-3 rounded-xl mt-1 bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="mt-5 block text-gray-700 font-medium">Password</label>
        <input
          type="password"
          className="w-full border p-3 rounded-xl mt-1 bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className={`w-full py-4 text-white rounded-xl mt-8 font-semibold transition
                     ${loading ? "bg-gray-600" : "bg-black hover:bg-gray-900"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-gray-700">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
