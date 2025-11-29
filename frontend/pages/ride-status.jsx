import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { FiUser } from "react-icons/fi";

export default function RideStatus() {
  const [ride, setRide] = useState(null);

  // 🔐 Protect route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("ride_id");
    apiGet(`/rides/${id}`).then((data) => setRide(data));
  }, []);

  if (!ride) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-lg w-full bg-white shadow-xl p-6 rounded-3xl">

        <h1 className="text-3xl font-bold mb-4">Driver is on the way</h1>

        <div className="flex justify-between bg-gray-50 p-4 rounded-xl border items-center">
          <div>
            <p className="font-semibold text-gray-900">Your Driver</p>
            <p className="text-gray-700">Rahul Singh</p>
          </div>
          <FiUser className="text-4xl text-gray-700" />
        </div>

        <p className="text-gray-700 mt-6">Status: {ride.status}</p>

        <button
          className="w-full bg-black text-white py-4 rounded-xl mt-6"
          onClick={() => (window.location.href = "/payment")}
        >
          Continue to Payment
        </button>

      </div>
    </div>
  );
}
