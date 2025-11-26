export default function History() {
  const data = [
    { id: 1, from: "MG Road", to: "Airport", fare: "₹300" },
    { id: 2, from: "Hinjewadi", to: "Shivaji Nagar", fare: "₹190" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Ride History</h2>

      {data.map((ride) => (
        <div key={ride.id} className="mt-3 p-3 bg-gray-100 rounded">
          {ride.from} → {ride.to}
          <p className="text-sm">Fare: {ride.fare}</p>
        </div>
      ))}
    </div>
  );
}
