export default function RideStatus() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Ride Status</h2>

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p>Status: Driver Assigned</p>
        <p>Driver: Amit Patil</p>
        <p>Vehicle: WagonR MH12 AB 2211</p>
      </div>

      <div className="mt-6 h-64 bg-gray-200 flex items-center justify-center">
        Map View (placeholder)
      </div>
    </div>
  );
}
