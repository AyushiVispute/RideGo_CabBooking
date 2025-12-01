// frontend/pages/home.jsx

import { useState, useEffect } from "react";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import dynamic from "next/dynamic";
import { apiGet } from "../utils/api";
import RideSheet from "../components/RideSheet";

// Load Leaflet map (client-side only)
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [pickupPos, setPickupPos] = useState(null);
  const [dropPos, setDropPos] = useState(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);

  const [startRideAnimation, setStartRideAnimation] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);

  // 🔐 Protect route – redirect if not logged in
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  /* -------------------------------------
     Autocomplete search (Photon, free)
  -------------------------------------- */
  async function searchPlaces(query, setter) {
    if (!query || query.length < 3) {
      setter([]);
      return;
    }

    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en`
    );
    const data = await res.json();

    const places = data.features.map((f) => ({
      name: f.properties.name,
      address:
        f.properties.street ||
        f.properties.suburb ||
        f.properties.city ||
        f.properties.state ||
        "",
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
    }));

    setter(places);
  }

  /* -------------------------------------
     Search Rides – requires coords
  -------------------------------------- */
  const handleEstimate = async () => {
    if (!pickupPos || !dropPos) {
      alert("Please choose pickup & drop from suggestions.");
      return;
    }

    // Backend estimate using text (optional)
    const res = await apiGet(`/rides/estimate?pickup=${pickup}&drop=${drop}`);

    localStorage.setItem("fare", res.fare);
    localStorage.setItem("distance", res.distance_km);
    localStorage.setItem("duration", res.duration_min);
    localStorage.setItem("pickup", pickup);
    localStorage.setItem("drop", drop);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto mt-6">
        <h1 className="text-4xl font-extrabold text-gray-900">Book your ride</h1>
        <p className="text-gray-600 mt-1 text-lg">Get anywhere, anytime</p>
      </div>

      {/* Uber-style search card */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg mt-6 p-6 border border-gray-200">
        {/* Pickup */}
        <div className="relative mb-6">
          <FiMapPin className="absolute left-3 top-4 text-gray-600 text-xl" />
          <input
            className="w-full border p-4 pl-12 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) => {
              const val = e.target.value;
              setPickup(val);
              searchPlaces(val, setPickupSuggestions);
            }}
          />

          {/* Pickup suggestions */}
          {pickupSuggestions.length > 0 && (
            <div className="absolute z-40 bg-white shadow-xl border rounded-xl mt-1 w-full max-h-60 overflow-y-auto">
              {pickupSuggestions.map((place, i) => (
                <div
                  key={i}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPickup(place.name);
                    setPickupPos({ lat: place.lat, lng: place.lng });
                    setPickupSuggestions([]);
                  }}
                >
                  <p className="font-semibold">{place.name}</p>
                  <p className="text-gray-500 text-sm">{place.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drop */}
        <div className="relative mb-6">
          <FiNavigation className="absolute left-3 top-4 text-gray-600 text-xl" />
          <input
            className="w-full border p-4 pl-12 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Drop location"
            value={drop}
            onChange={(e) => {
              const val = e.target.value;
              setDrop(val);
              searchPlaces(val, setDropSuggestions);
            }}
          />

          {/* Drop suggestions */}
          {dropSuggestions.length > 0 && (
            <div className="absolute z-40 bg-white shadow-xl border rounded-xl mt-1 w-full max-h-60 overflow-y-auto">
              {dropSuggestions.map((place, i) => (
                <div
                  key={i}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDrop(place.name);
                    setDropPos({ lat: place.lat, lng: place.lng });
                    setDropSuggestions([]);
                  }}
                >
                  <p className="font-semibold">{place.name}</p>
                  <p className="text-gray-500 text-sm">{place.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
          onClick={handleEstimate}
        >
          Search Rides
        </button>
      </div>

      {/* Map */}
      <Map
        pickupPos={pickupPos}
        dropPos={dropPos}
        startRideAnimation={startRideAnimation}
      />

      {/* Bottom sheet (Uber-style flow) */}
      <RideSheet
        pickupPos={pickupPos}
        dropPos={dropPos}
        onPickupSelect={setPickupPos}
        onDropSelect={setDropPos}
        onRideStart={() => setStartRideAnimation(true)}
        driverAssigned={(driver) => setDriverInfo(driver)}
      />

      {/* Ride options */}
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
