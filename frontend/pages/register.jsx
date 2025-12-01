import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      await apiPost("/auth/register", { name, email, phone, password });

      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
      {/* Card */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl w-full max-w-md shadow-xl border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        {/* Full Name */}
        <label className="font-medium text-gray-700">Full Name</label>
        <input
          className="w-full p-3 border rounded-xl mt-1 bg-gray-50 text-black 
                    focus:ring-2 focus:ring-black outline-none transition"
          placeholder="Ayu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <label className="font-medium text-gray-700 mt-4 block">Email</label>
        <input
          type="email"
          className="w-full p-3 border rounded-xl mt-1 bg-gray-50 text-black 
                    focus:ring-2 focus:ring-black outline-none transition"
          placeholder="example@gmail.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone */}
        <label className="font-medium text-gray-700 mt-4 block">Phone</label>
        <input
          type="text"
          className="w-full p-3 border rounded-xl mt-1 bg-gray-50 text-black 
                    focus:ring-2 focus:ring-black outline-none transition"
          placeholder="9999999999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* Password */}
        <label className="font-medium text-gray-700 mt-4 block">Password</label>
        <input
            type="password"
            className="w-full p-3 border rounded-xl mt-1 bg-gray-50 text-black 
                      focus:ring-2 focus:ring-black outline-none transition"
            placeholder="Enter password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full mt-6 p-3 rounded-xl text-white font-medium transition 
          ${loading ? "bg-gray-800 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}
