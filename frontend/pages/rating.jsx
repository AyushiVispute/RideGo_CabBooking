import { useState } from "react";
import { FiStar } from "react-icons/fi";

export default function Rating() {
  const [rating, setRating] = useState(0);

  const submitRating = () => {
    alert("Thank you for your feedback!");
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Rate Your Ride
        </h1>

        {/* Rating Stars */}
        <div className="flex gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={`text-4xl cursor-pointer ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Feedback */}
        <textarea
          className="w-full border p-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Share your feedback..."
          rows={4}
        ></textarea>

        {/* Submit button */}
        <button
          onClick={submitRating}
          className="w-full bg-black text-white py-4 rounded-xl mt-8 text-lg font-semibold hover:bg-gray-900 transition shadow-md"
        >
          Submit Rating
        </button>

      </div>
    </div>
  );
}
