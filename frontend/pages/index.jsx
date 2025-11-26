export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">RideGo – Cab Booking</h1>
      <p className="text-gray-600 mt-2 text-center">
        Your reliable ride booking platform.
      </p>

      <div className="mt-6 flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-black text-white rounded-lg text-lg"
        >
          Login
        </a>

        <a
          href="/register"
          className="px-6 py-3 bg-gray-200 text-black rounded-lg text-lg"
        >
          Register
        </a>
      </div>
    </div>
  );
}
