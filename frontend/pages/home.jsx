import { useState } from "react";

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const handleEstimate = () => {
    if (!pickup || !drop) {
      alert("Please enter both pickup and drop locations.");
      return;
    }

    // Navigation to fare estimate/book page
    window.location.href = "/book";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Book a Ride</h1>

      {/* Map Placeholder */}
      <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-700">Map View (Coming Soon)</p>
      </div>

      {/* Pickup */}
      <label className="block mt-6 font-medium">Pickup Location</label>
      <input
        type="text"
        className="w-full border p-2 rounded mt-1"
        placeholder="Enter pickup location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />

      {/* Drop */}
      <label className="block mt-4 font-medium">Drop Location</label>
      <input
        type="text"
        className="w-full border p-2 rounded mt-1"
        placeholder="Enter drop location"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleEstimate}
        className="w-full mt-6 bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-900"
      >
        Get Fare Estimate
      </button>
    </div>
  );
}
