import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/ride-status"), 2000);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 border-4 border-green-500 rounded-full flex justify-center items-center">
          <div className="w-12 h-12 bg-green-500 rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
        <p className="text-gray-600 mt-2">Redirecting…</p>
      </div>
    </div>
  );
}
