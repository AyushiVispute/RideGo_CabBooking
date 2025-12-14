import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

export default function History() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Protect route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  // Fetch ride history
  useEffect(() => {
    apiGet("/rides/user/history")
      .then((res) => setRides(res))
      .finally(() => setLoading(false));
  }, []);

  const getStatusStyle = (status) => {
    if (status === "completed")
      return "bg-green-100 text-green-700";
    if (status === "cancelled")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-xl w-full text-black">

        <h1 className="text-3xl font-bold mb-6 text-center">
          🚗 Ride History
        </h1>

        {/* ⏳ Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading rides...</p>
        )}

        {/* 📭 Empty State */}
        {!loading && rides.length === 0 && (
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <p className="text-gray-600">You haven’t taken any rides yet.</p>
          </div>
        )}

        {/* 📜 Ride Cards */}
        {!loading &&
          rides.map((r) => (
            <div
              key={r.id}
              className="bg-white shadow-md p-5 rounded-2xl border mb-4 
                         transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Ride #{r.id}</h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full capitalize ${getStatusStyle(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>

              <p><strong>Pickup:</strong> {r.pickup}</p>
              <p><strong>Drop:</strong> {r.drop}</p>
              <p><strong>Fare:</strong> ₹{r.fare}</p>

              {r.created_at && (
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
