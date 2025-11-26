import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await apiPost("/auth/login", { email, password });
    console.log(res);
    alert("Login Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <label className="block mt-4">Email</label>
        <input
          className="w-full border p-2 rounded mt-1"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mt-4">Password</label>
        <input
          className="w-full border p-2 rounded mt-1"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-3 rounded-lg mt-6"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">Register</a>
        </p>
      </div>
    </div>
  );
}
