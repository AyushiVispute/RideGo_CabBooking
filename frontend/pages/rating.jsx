export default function Rating() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Rate Your Ride</h2>

      <div className="mt-4">
        <textarea className="w-full p-3 border rounded" placeholder="Your feedback..." />
      </div>

      <button className="bg-black text-white p-3 w-full mt-4 rounded">
        Submit Rating
      </button>
    </div>
  );
}
