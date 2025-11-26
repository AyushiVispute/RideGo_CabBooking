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

    console.log(res);
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        <label className="block mt-4">Full Name</label>
        <input
          className="w-full border p-2 rounded mt-1"
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mt-4">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mt-1"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mt-4">Phone Number</label>
        <input
          type="number"
          className="w-full border p-2 rounded mt-1"
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="block mt-4">Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mt-1"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-3 rounded-lg mt-6"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}
