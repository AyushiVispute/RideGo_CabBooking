import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

import {
  FiDollarSign,
  FiSmartphone,
  FiCreditCard,
  FiGrid,
  FiBriefcase,
} from "react-icons/fi";

export default function Payment() {
  const router = useRouter();

  // Prevent accidental UPI auto-open
  useEffect(() => {
    setMethod("cash");
  }, []);

  const [method, setMethod] = useState("cash");
  const [showQR, setShowQR] = useState(false);
  const [walletBalance, setWalletBalance] = useState(400);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const amount = 100.0; // sample
  const UPI_ID = "yourupi@bank";
  const NAME = "RideGo";

  const upiURL = `upi://pay?pa=${encodeURIComponent(
    UPI_ID
  )}&pn=${encodeURIComponent(NAME)}&am=${amount}&cu=INR`;

  const methods = [
    { id: "cash", name: "Cash", subtitle: "Pay driver after the trip", icon: <FiDollarSign size={22} /> },
    { id: "upi", name: "UPI Apps", subtitle: "Google Pay, PhonePe, Paytm", icon: <FiSmartphone size={22} /> },
    { id: "qr", name: "UPI QR Code", subtitle: "Scan & pay instantly", icon: <FiGrid size={22} /> },
    { id: "card", name: "Debit / Credit Card", subtitle: "Visa, Mastercard, RuPay", icon: <FiCreditCard size={22} /> },
    { id: "wallet", name: "Wallet", subtitle: "Use your RideGo wallet", icon: <FiBriefcase size={22} /> },
  ];

  const cards = [
    { id: 1, brand: "Visa", last4: "1245", name: "Ayushi Vispute" },
    { id: 2, brand: "Mastercard", last4: "9912", name: "Ayushi V." },
  ];

  const handleAddMoney = (amt) => {
    setWalletBalance(walletBalance + amt);
  };

  const handleContinue = () => {
    if (method === "upi") {
      window.location.href = upiURL;
      setTimeout(() => router.push("/payment-success"), 2500);
      return;
    }

    if (method === "qr") {
      setShowQR(true);
      return;
    }

    router.push("/ride-status");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-5">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-lg mt-5">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-black">Choose payment method</h2>

        {/* Payment Options */}
        <div className="space-y-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full p-4 flex items-center gap-3 rounded-xl border transition 
                ${
                  method === m.id
                    ? "border-black bg-gray-100 shadow-sm"
                    : "border-gray-300 hover:border-black"
                }
              `}
            >
              <div>{m.icon}</div>
              <div className="text-left">
                <p className="text-lg font-semibold text-black">{m.name}</p>
                <p className="text-xs text-gray-600">{m.subtitle}</p>
              </div>
              {method === m.id && (
                <span className="text-green-600 text-xl ml-auto">✔</span>
              )}
            </button>
          ))}
        </div>

        {/* ================================
            WALLET UI 
        ================================= */}
        {method === "wallet" && (
          <div className="mt-5 border rounded-2xl p-4 bg-gray-50">
            <p className="text-sm text-gray-700 mb-1">
              Wallet Balance:{" "}
              <span className="font-bold text-black">₹{walletBalance.toFixed(2)}</span>
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Add money to your wallet for faster checkout.
            </p>

            <div className="flex gap-3">
              {[100, 200, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleAddMoney(amt)}
                  className="flex-1 py-3 rounded-xl border text-black bg-white text-sm font-medium hover:border-black hover:bg-gray-100 transition"
                >
                  + ₹{amt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================================
            CARD UI 
        ================================= */}
        {method === "card" && (
          <div className="mt-5 border rounded-2xl p-4 bg-gray-50">
            <p className="text-sm text-gray-700 mb-2">Saved cards</p>

            <div className="space-y-2 mb-2">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`w-full flex justify-between items-center p-3 rounded-xl border bg-white text-left text-sm
                    ${
                      selectedCardId === card.id
                        ? "border-black shadow-sm"
                        : "border-gray-300 hover:border-black"
                    }
                  `}
                >
                  <div>
                    <p className="font-semibold text-black">
                      {card.brand} •••• {card.last4}
                    </p>
                    <p className="text-xs text-gray-500">{card.name}</p>
                  </div>

                  {selectedCardId === card.id && (
                    <span className="text-green-600 font-bold text-lg">✔</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================================
            FARE SUMMARY AT BOTTOM
        ================================= */}
        <div className="mt-8 border-t pt-5">
          <h1 className="text-xl font-bold text-black mb-2">Trip Fare Summary</h1>

          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹40.00</span>
            </div>

            <div className="flex justify-between">
              <span>Distance Charge</span>
              <span>₹50.00</span>
            </div>

            <div className="flex justify-between">
              <span>Time Charge</span>
              <span>₹10.00</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-black text-lg">
              <span>Total</span>
              <span>₹100.00</span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-black text-white p-3 rounded-xl mt-6 font-bold"
        >
          Continue
        </button>

        {/* QR Modal */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Scan & Pay</h3>

              <div className="flex justify-center bg-white p-4 rounded-xl">
                <QRCode value={upiURL} size={200} />
              </div>

              <p className="text-center mt-3">UPI ID: {UPI_ID}</p>

              <button
                onClick={() => router.push("/payment-success")}
                className="w-full bg-black text-white p-3 rounded-xl mt-5"
              >
                I've Paid
              </button>

              <button
                onClick={() => setShowQR(false)}
                className="w-full mt-3 text-black p-2 rounded-xl border border-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
