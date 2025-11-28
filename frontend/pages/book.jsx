import { FiDollarSign, FiClock, FiMapPin } from "react-icons/fi";

export default function Book() {
  const handleBookRide = () => {
    alert("Ride booked (demo only)");
    window.location.href = "/ride-status";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Fare Estimate
        </h1>

        {/* Fare Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Estimated Fare: <span className="text-black">₹180</span>
          </h2>

          <div className="flex items-center gap-3 mt-4">
            <FiMapPin className="text-gray-600 text-xl" />
            <p className="text-gray-700 text-md">Distance: 12.4 km</p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <FiClock className="text-gray-600 text-xl" />
            <p className="text-gray-700 text-md">Estimated Time: 22 mins</p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <FiDollarSign className="text-gray-600 text-xl" />
            <p className="text-gray-700 text-md">Base Fare + Distance + Time</p>
          </div>

        </div>

        {/* Book Button */}
        <button
          className="w-full bg-black text-white py-4 rounded-xl mt-8 text-lg font-semibold 
                     hover:bg-gray-900 transition shadow-md"
          onClick={handleBookRide}
        >
          Book Ride
        </button>
      </div>
    </div>
  );
}
