export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6">

      {/* Floating Animated Taxi Illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/743/743131.png"
        alt="Taxi Icon"
        className="w-28 absolute top-10 right-10 opacity-80 animate-floating"
      />

      {/* Glow Effect Circles */}
      <div className="absolute w-72 h-72 bg-yellow-500/20 blur-[100px] rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-[130px] rounded-full bottom-10 right-10"></div>

      {/* GLASS CARD */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] rounded-3xl p-10 max-w-xl w-full text-center animate-fadeIn">

        {/* Brand */}
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
          RideGo 🚖
        </h1>

        <p className="text-lg opacity-90 mb-8">
          Your journey begins with comfort, speed & reliability.
        </p>

        {/* Main Hero Illustration */}
        <div className="relative">
          <img
           src="https://pngimg.com/uploads/taxi/taxi_PNG19.png"
            className="w-72 mx-auto mb-10 drop-shadow-xl animate-heroFloat"
            alt="Taxi"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-5">

          <a
            href="/login"
            className="px-8 py-3 rounded-full font-semibold text-lg shadow-xl
             bg-white text-black 
             hover:scale-110 active:scale-95 
             transition-all duration-300 
             hover:shadow-[0_0_20px_white]"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-8 py-3 rounded-full font-semibold text-lg
            border border-white/40 bg-black/40 backdrop-blur-md 
            hover:bg-white hover:text-black 
            hover:scale-110 active:scale-95 
            transition-all duration-300 
            shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          >
            Register
          </a>

        </div>
      </div>
    </div>
  );
}