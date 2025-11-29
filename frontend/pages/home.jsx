import { useState, useEffect } from "react";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import dynamic from "next/dynamic";
import { apiGet } from "../utils/api";

// Load Leaflet map (no SSR)
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  // 🔐 TOKEN PROTECTION — redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "" || token === null) {
      window.location.href = "/login";
    }
  }, []);

  const handleEstimate = async () => {
    if (!pickup || !drop) {
      alert("Please enter both locations");
      return;
    }

    const res = await apiGet(`/rides/estimate?pickup=${pickup}&drop=${drop}`);

    localStorage.setItem("fare", res.fare);
    localStorage.setItem("distance", res.distance_km);
    localStorage.setItem("duration", res.duration_min);
    localStorage.setItem("pickup", pickup);
    localStorage.setItem("drop", drop);

    window.location.href = "/book";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-24">

      <div className="max-w-2xl mx-auto mt-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Book your ride
        </h1>
        <p className="text-gray-600 mt-1 text-lg">Get anywhere, anytime</p>
      </div>

      {/* Search Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg mt-6 p-6 border border-gray-200">

        {/* Pickup */}
        <div className="relative mb-6">
          <FiMapPin className="absolute left-3 top-3 text-gray-600 text-xl" />
          <input
            className="w-full border p-4 pl-12 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Pickup location"
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        {/* Drop */}
        <div className="relative mb-6">
          <FiNavigation className="absolute left-3 top-3 text-gray-600 text-xl" />
          <input
            className="w-full border p-4 pl-12 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Drop location"
            onChange={(e) => setDrop(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
          onClick={handleEstimate}
        >
          Search Rides
        </button>
      </div>

      {/* Map */}
      <div className="max-w-2xl mx-auto mt-8">
        <Map />
      </div>

      {/* Ride Options */}
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Choose Your Ride</h2>

        <div className="grid grid-cols-2 gap-4">
          <RideCard 
            title="Standard" 
            img="https://cdn-icons-png.flaticon.com/512/7439/7439630.png"
            desc="Affordable everyday rides"
          />
          <RideCard 
            title="Auto" 
            img="https://cdn-icons-png.flaticon.com/512/7440/7440524.png"
            desc="Quick & budget friendly"
          />
          <RideCard 
            title="Bike" 
            img="https://cdn-icons-png.flaticon.com/512/7439/7439622.png"
            desc="Fast solo travel"
          />
          <RideCard 
            title="Premium" 
            img="https://cdn-icons-png.flaticon.com/512/7439/7439637.png"
            desc="Luxury & comfort"
          />
        </div>
      </div>

    </div>
  );
}

function RideCard({ title, img, desc }) {
  return (
    <div className="bg-white shadow-lg border rounded-2xl p-5 hover:shadow-xl transition cursor-pointer">
      <img src={img} className="w-24 mx-auto" />
      <h3 className="text-center font-semibold text-gray-900 mt-3">{title}</h3>
      <p className="text-center text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
