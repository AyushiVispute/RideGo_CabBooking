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

    const body = {
      name,
      email,
      phone,
      password
    };

    console.log("Sending to backend:", body); // DEBUG

    try {
      const res = await apiPost("/auth/register", body);
      alert("Account Created!");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md border border-gray-300">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create Account
        </h1>

        <label className="text-gray-700 font-medium">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-xl mt-1 bg-gray-100"
        />

        <label className="mt-4 block text-gray-700 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mt-1 bg-gray-100"
        />

        <label className="mt-4 block text-gray-700 font-medium">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded-xl mt-1 bg-gray-100"
        />

        <label className="mt-4 block text-gray-700 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mt-1 bg-gray-50"
          placeholder="Enter password"
      />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white p-3 rounded-xl mt-6 hover:bg-gray-800 transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </div>
    </div>
  );
}
