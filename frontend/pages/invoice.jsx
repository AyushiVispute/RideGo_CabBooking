import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Invoice() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    rideId: null,
    pickup: "",
    drop: "",
    fare: 0,
    method: "",
    date: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rideId = localStorage.getItem("ride_id");
    const pickup = localStorage.getItem("pickup_text") || "Not available";
    const drop = localStorage.getItem("drop_text") || "Not available";
    const fare = parseFloat(localStorage.getItem("fare") || "0");
    const method = localStorage.getItem("payment_method") || "N/A";
    const date = new Date().toLocaleString();

    setData({
      rideId,
      pickup,
      drop,
      fare: Number.isNaN(fare) ? 0 : fare,
      method,
      date,
    });
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading invoice…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-black mb-4">Trip Receipt</h1>

        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Ride ID</span>
            <span>{data.rideId || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span>{data.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span>{data.method}</span>
          </div>
        </div>

        <div className="border rounded-2xl p-4 mb-4 bg-gray-50">
          <p className="font-semibold text-black mb-1">Route</p>
          <p className="text-sm text-gray-700">
            {data.pickup} → {data.drop}
          </p>
        </div>

        <div className="border rounded-2xl p-4 bg-gray-50 text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Trip Fare</span>
            <span>₹{data.fare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Fees</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2 mt-1">
            <span>Total Paid</span>
            <span>₹{data.fare.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-black text-white rounded-xl py-2 font-bold"
          >
            Back to Home
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 border rounded-xl py-2 font-semibold"
          >
            Print / Save
          </button>
        </div>
      </div>
    </div>
  );
}
