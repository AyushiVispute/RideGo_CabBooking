import { useState } from "react";
import { FiMapPin, FiNavigation, FiClock, FiStar } from "react-icons/fi";
import dynamic from "next/dynamic";

// Load map without SSR
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const handleEstimate = () => {
    if (!pickup || !drop) {
      alert("Please enter pickup & drop locations.");
      return;
    }
    window.location.href = "/book";
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-20">

      {/* Top Section */}
      <div className="max-w-2xl mx-auto mt-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
          Where are you heading?
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Book a ride in just seconds.
        </p>
      </div>

      {/* Search Box (Uber Style) */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl p-6 rounded-3xl mt-6 border border-gray-200">
        
        {/* Pickup Field */}
        <div className="relative mb-6">
          <div className="absolute top-3 left-3 bg-gray-200 p-2 rounded-full">
            <FiMapPin className="text-gray-600" />
          </div>

          <input
            className="w-full border p-4 pl-14 rounded-2xl bg-gray-50 text-gray-900 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        {/* Drop Location */}
        <div className="relative">
          <div className="absolute top-3 left-3 bg-gray-200 p-2 rounded-full">
            <FiNavigation className="text-gray-600" />
          </div>

          <input
            className="w-full border p-4 pl-14 rounded-2xl bg-gray-50 text-gray-900 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Drop location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          className="w-full bg-black text-white py-4 rounded-2xl mt-6 text-lg font-semibold 
                     hover:bg-gray-900 transition shadow-md"
          onClick={handleEstimate}
        >
          Search Rides
        </button>
      </div>

      {/* Real Map */}
      <div className="max-w-2xl mx-auto mt-8">
        <Map />
      </div>

      {/* Ride Categories */}
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Ride</h2>

        <div className="grid grid-cols-2 gap-4">

          {/* UberX */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer">
            <img
              src="https://i.imgur.com/0QK3E2q.png"
              className="w-24 mx-auto"
              alt="UberX"
            />
            <h3 className="text-center font-semibold mt-3 text-gray-900">Standard</h3>
            <p className="text-center text-gray-500 text-sm">Affordable everyday rides</p>
          </div>

          {/* Auto */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer">
            <img
              src="https://i.imgur.com/eqkp1uq.png"
              className="w-20 mx-auto"
              alt="Auto"
            />
            <h3 className="text-center font-semibold mt-3 text-gray-900">Auto</h3>
            <p className="text-center text-gray-500 text-sm">Quick & budget-friendly</p>
          </div>

          {/* Moto */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer">
            <img
              src="https://i.imgur.com/r2DcvhO.png"
              className="w-20 mx-auto"
              alt="Moto"
            />
            <h3 className="text-center font-semibold mt-3 text-gray-900">Bike</h3>
            <p className="text-center text-gray-500 text-sm">Fast solo travel</p>
          </div>

          {/* Premium */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer">
            <img
              src="https://i.imgur.com/8fXQ1ZD.png"
              className="w-24 mx-auto"
              alt="Premium"
            />
            <h3 className="text-center font-semibold mt-3 text-gray-900">Premium</h3>
            <p className="text-center text-gray-500 text-sm">Luxury rides</p>
          </div>
        </div>
      </div>

    </div>
  );
}
