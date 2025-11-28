import { FiUser, FiPhone, FiMapPin } from "react-icons/fi";

export default function RideStatus() {
  const completeRide = () => {
    window.location.href = "/payment";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Ride Status
        </h1>

        {/* Driver Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Driver Assigned
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <FiUser className="text-gray-700 text-3xl" />
            <div>
              <p className="text-gray-900 font-semibold text-lg">Amit Patil</p>
              <p className="text-gray-600 text-sm">WagonR · MH12 AB 2211</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <FiPhone className="text-gray-600 text-xl" />
            <p className="text-gray-700">+91 9876543210</p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <FiMapPin className="text-gray-600 text-xl" />
            <p className="text-gray-700">Driver is on the way...</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-64 bg-gray-300 rounded-2xl flex items-center justify-center text-gray-700 font-medium mt-6">
          Live Map (Coming Soon)
        </div>

        {/* Complete Ride */}
        <button
          onClick={completeRide}
          className="w-full bg-black text-white py-4 rounded-xl mt-8 text-lg font-semibold hover:bg-gray-900 transition shadow-md"
        >
          Complete Ride
        </button>

      </div>
    </div>
  );
}
