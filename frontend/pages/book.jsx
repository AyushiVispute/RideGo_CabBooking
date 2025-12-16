import { useEffect, useState } from "react";
import { apiPost } from "../utils/api";
import { FiClock, FiMapPin, FiNavigation } from "react-icons/fi";

export default function Book() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [fare, setFare] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  // 🔐 Protection
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Route protection
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
        return;
      }

      // Load values safely
      setPickup(localStorage.getItem("pickup") || "");
      setDrop(localStorage.getItem("drop") || "");
      setFare(localStorage.getItem("fare") || "");
      setDistance(localStorage.getItem("distance") || "");
      setDuration(localStorage.getItem("duration") || "");
    }
  }, []);

  const confirmRide = async () => {
    try {
      const res = await apiPost("/rides/request", { pickup, drop });

      localStorage.setItem("ride_id", res.id);
      window.location.href = "/ride-status";
    } catch (err) {
      alert("Ride request failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-xl w-full bg-white shadow-xl p-6 rounded-3xl">

        <h1 className="text-3xl font-bold mb-6">Confirm your ride</h1>

        <div className="bg-gray-50 p-6 rounded-2xl border">
          <p className="text-lg font-semibold text-gray-800">₹ {fare}</p>

          <div className="flex items-center gap-3 mt-4 text-gray-700">
            <FiMapPin /> Pickup: {pickup}
          </div>

          <div className="flex items-center gap-3 mt-2 text-gray-700">
            <FiNavigation /> Drop: {drop}
          </div>

          <div className="flex items-center gap-3 mt-2 text-gray-700">
            <FiClock /> Duration: {duration} min
          </div>

          <p className="text-gray-700 mt-2">Distance: {distance} km</p>
        </div>

        <button
          className="w-full bg-black text-white mt-8 py-4 rounded-xl text-lg hover:bg-gray-900"
          onClick={confirmRide}
        >
          Confirm Ride
        </button>

      </div>
    </div>
  );
}
