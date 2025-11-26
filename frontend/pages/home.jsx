import Map from "../components/Map";

export default function Home() {
  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold">Book a Ride</h1>
      <Map />

      <div className="mt-4">
        <input className="w-full p-2 border rounded" placeholder="Pickup Location" />
        <input className="w-full p-2 border rounded mt-2" placeholder="Drop Location" />
        <button className="w-full bg-black text-white p-3 rounded mt-3">
          Get Fare Estimate
        </button>
      </div>
    </div>
  );
}
