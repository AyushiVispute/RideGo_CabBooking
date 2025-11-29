import { useEffect } from "react";
import { apiPost } from "../utils/api";

export default function Payment() {
  const amount = localStorage.getItem("fare");
  const ride_id = localStorage.getItem("ride_id");

  // 🔐 Protect page
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  const payNow = async () => {
    const res = await apiPost("/payments/create", {
      ride_id,
      amount,
    });

    if (res.success) {
      alert("Payment Successful!");
      window.location.href = "/history";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="max-w-md bg-white shadow-xl p-8 rounded-3xl border">

        <h1 className="text-3xl font-bold text-center mb-6">Payment</h1>

        <p className="text-gray-700 text-center mb-6">
          Total Fare:
          <span className="text-black font-bold"> ₹{amount}</span>
        </p>

        <button
          className="w-full bg-black text-white py-4 rounded-xl text-lg hover:bg-gray-900"
          onClick={payNow}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
