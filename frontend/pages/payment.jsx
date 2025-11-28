import { FiCreditCard } from "react-icons/fi";

export default function Payment() {
  const payNow = () => {
    alert("Payment Successful (Demo)");
    window.location.href = "/rating";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Payment
        </h1>

        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Total Fare</h2>

          <p className="text-3xl font-bold text-black mt-3">₹180</p>

          <div className="flex items-center gap-3 mt-4">
            <FiCreditCard className="text-gray-600 text-xl" />
            <p className="text-gray-700">Pay using UPI / Card / Cash</p>
          </div>
        </div>

        <button
          onClick={payNow}
          className="w-full bg-black text-white py-4 rounded-xl mt-8 text-lg font-semibold hover:bg-gray-900 transition shadow-md"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}

