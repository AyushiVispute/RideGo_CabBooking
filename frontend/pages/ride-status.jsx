import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser, FiClock, FiMapPin, FiPhoneCall } from "react-icons/fi";

export default function RideStatus() {
  const router = useRouter();

  const [eta, setEta] = useState(5); // Driver arrives in 5 minutes
  const [driverDistance, setDriverDistance] = useState(1.2); // example distance

  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
      setDriverDistance((prev) => (prev > 0.2 ? prev - 0.2 : 0.2));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Auto-redirect to payment when ETA hits 1 min
  useEffect(() => {
    if (eta === 1) {
      setTimeout(() => router.push("/payment"), 2000);
    }
  }, [eta]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-black mb-4 text-center">
        Your Driver is on the way 🚗
      </h1>

      {/* Driver Card */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow p-5 flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-lg text-black">Rahul Singh</p>
          <p className="text-gray-600">Auto • MH12 AB 5678</p>
        </div>

        <div className="bg-gray-100 p-3 rounded-full">
          <FiUser size={30} className="text-gray-700" />
        </div>
      </div>

      {/* Live ETA */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-5 mb-4">
        <div className="flex items-center gap-3">
          <FiClock size={22} className="text-gray-600" />
          <p className="text-gray-700 text-lg">
            Arrival in <span className="font-bold">{eta} min</span>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <FiMapPin size={22} className="text-green-600" />
          <p className="text-gray-700">{driverDistance.toFixed(1)} km away</p>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Tracking driver location…
        </p>
      </div>

      {/* Animated Car Path */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow p-6 mt-2 mb-6 overflow-hidden">
        <div className="h-2 bg-gray-200 rounded-full"></div>

        {/* Moving Car */}
        <div
          className="absolute top-6 left-0 transition-all duration-500"
          style={{ transform: `translateX(${(5 - eta) * 50}px)` }}
        >
          🚕
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          Driver is approaching your location…
        </p>
      </div>

      {/* Call Driver */}
      <button className="w-full max-w-lg flex justify-center gap-2 items-center bg-white border p-3 rounded-xl text-black text-lg font-semibold shadow mb-4 hover:bg-gray-100">
        <FiPhoneCall size={20} /> Call Driver
      </button>

      {/* Manual Continue Button */}
      <button
        onClick={() => router.push("/payment")}
        className="w-full max-w-lg bg-black text-white p-4 rounded-xl text-lg font-semibold shadow hover:bg-gray-900 transition"
      >
        Continue to Payment
      </button>

      <p className="text-gray-500 text-xs mt-3">
        You will be redirected automatically when the driver arrives.
      </p>
    </div>
  );
}
