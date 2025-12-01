import { useEffect, useState } from "react";
import { apiPost } from "../utils/api";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [ride_id, setRideId] = useState("");

  // Load localStorage safely + protect page
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
        return;
      }

      setAmount(localStorage.getItem("fare") || "");
      setRideId(localStorage.getItem("ride_id") || "");
    }
  }, []);

  const makePayment = async () => {
    try {
      const res = await apiPost("/payments/create", { ride_id, amount });
      alert("Payment successful!");
      window.location.href = "/ride-status";
    } catch (err) {
      alert("Payment failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-4 text-center">Payment</h1>

        <p className="text-xl mb-4">Amount: <b>₹ {amount}</b></p>

        <button
          className="w-full p-4 bg-black text-white rounded-xl text-lg"
          onClick={makePayment}
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}
