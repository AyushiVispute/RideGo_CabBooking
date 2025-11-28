import { FiMapPin } from "react-icons/fi";

export default function History() {
  const rides = [
    { id: 1, from: "MG Road", to: "Airport", fare: "₹300" },
    { id: 2, from: "Hinjewadi", to: "Shivaji Nagar", fare: "₹190" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Ride History
        </h1>

        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white p-6 shadow-lg rounded-2xl border border-gray-200 mb-4"
          >
            <div className="flex items-center gap-3">
              <FiMapPin className="text-gray-700 text-2xl" />
              <div>
                <p className="text-gray-900 font-semibold">
                  {ride.from} → {ride.to}
                </p>
                <p className="text-gray-600 text-sm">Fare: {ride.fare}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
