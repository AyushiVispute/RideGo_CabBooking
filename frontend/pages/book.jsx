import { apiPost } from "../utils/api";

export default function Book() {
  const handleBook = async () => {
    const res = await apiPost("/rides/request", {
      pickup: "MG Road",
      drop: "Pune Station"
    });
    console.log(res);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Confirm Ride</h2>

      <button 
        className="bg-black text-white p-3 w-full mt-4 rounded"
        onClick={handleBook}>
        Book Now
      </button>
    </div>
  );
}
