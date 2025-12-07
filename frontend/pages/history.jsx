import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

export default function History() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    apiGet("/rides/user/history").then((res) => setRides(res));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-xl w-full text-black">   {/* <-- FIX ADDED */}

        <h1 className="text-3xl font-bold mb-6">Ride History</h1>

        {rides.length === 0 ? (
          <p>No rides yet.</p>
        ) : (
          rides.map((r) => (
            <div
              key={r.id}
              className="bg-white shadow-md p-5 rounded-2xl border mb-4 text-black" /* <-- ensure text black */
            >
              <p><strong>Pickup:</strong> {r.pickup}</p>
              <p><strong>Drop:</strong> {r.drop}</p>
              <p><strong>Fare:</strong> ₹{r.fare}</p>
              <p><strong>Status:</strong> {r.status}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
