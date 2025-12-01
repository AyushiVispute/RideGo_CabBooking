// frontend/components/RideSheet.jsx
import { useState, useEffect } from "react";

export default function RideSheet({
  onPickupSelect,
  onDropSelect,
  pickupPos,
  dropPos,
  onRideStart,
  driverAssigned,
}) {
  const [step, setStep] = useState("pickup"); // pickup → drop → summary → searching → driver
  const [pickupText, setPickupText] = useState("");
  const [dropText, setDropText] = useState("");

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);

  const [sheetMode, setSheetMode] = useState("hidden"); // hidden → full → collapsed

  /* ------------------------------
      Slide up when component loads
  ------------------------------ */
  useEffect(() => {
    const t = setTimeout(() => setSheetMode("full"), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step === "pickup" || step === "drop" || step === "summary") {
      setSheetMode("full");
    } else {
      setSheetMode("collapsed");
    }
  }, [step]);

  /* ------------------------------
      AUTOCOMPLETE SEARCH (PHOTON)
  ------------------------------ */
  async function searchPlaces(query, setter) {
    if (!query || query.length < 3) {
      setter([]);
      return;
    }

    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en`
    );
    const data = await res.json();

    const results = data.features.map((item) => ({
      name: item.properties.name,
      address:
        item.properties.street ||
        item.properties.suburb ||
        item.properties.city ||
        item.properties.state ||
        "",
      lat: item.geometry.coordinates[1],
      lng: item.geometry.coordinates[0],
    }));

    setter(results);
  }

  /* ------------------------------
      HANDLE PICKUP & DROP
  ------------------------------ */
  const handlePickupSelect = (place) => {
    setPickupText(place.name);
    setPickupSuggestions([]);
    onPickupSelect({ lat: place.lat, lng: place.lng });
    setStep("drop");
  };

  const handleDropSelect = (place) => {
    setDropText(place.name);
    setDropSuggestions([]);
    onDropSelect({ lat: place.lat, lng: place.lng });
    setStep("summary");
  };

  const handleConfirmRide = () => {
    setStep("searching");

    setTimeout(() => {
      const driver = {
        name: "Arjun",
        car: "Swift",
        plate: "MH12 AB 3456",
        eta: 4,
      };

      driverAssigned(driver);
      setStep("driver");
      onRideStart();
    }, 2500);
  };

  /* ------------------------------
      SHEET ANIMATION STYLE
  ------------------------------ */
  const sheetTransform =
    sheetMode === "hidden"
      ? "translate-y-full"
      : sheetMode === "collapsed"
      ? "translate-y-[55%]"
      : "translate-y-0";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[2000] flex justify-center transition-transform duration-300 ${sheetTransform}`}
    >
      <div className="bg-white rounded-t-3xl shadow-xl p-5 w-full max-w-xl">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* ------------------- STEP 1: PICKUP ------------------- */}
        {step === "pickup" && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Where can we pick you up?
            </h2>

            <input
              className="w-full border p-3 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-500"
              placeholder="Enter pickup location"
              value={pickupText}
              onChange={(e) => {
                setPickupText(e.target.value);
                searchPlaces(e.target.value, setPickupSuggestions);
              }}
            />

            {/* Pickup suggestions */}
            {pickupSuggestions.length > 0 && (
              <div className="bg-white shadow-xl border rounded-xl mt-2 max-h-56 overflow-y-auto">
                {pickupSuggestions.map((place, i) => (
                  <div
                    key={i}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePickupSelect(place)}
                  >
                    <p className="font-semibold">{place.name}</p>
                    <p className="text-gray-500 text-sm">{place.address}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ------------------- STEP 2: DROP ------------------- */}
        {step === "drop" && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Where are you going?
            </h2>

            <input
              className="w-full border p-3 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-500"
              placeholder="Enter drop location"
              value={dropText}
              onChange={(e) => {
                setDropText(e.target.value);
                searchPlaces(e.target.value, setDropSuggestions);
              }}
            />

            {dropSuggestions.length > 0 && (
              <div className="bg-white shadow-xl border rounded-xl mt-2 max-h-56 overflow-y-auto">
                {dropSuggestions.map((place, i) => (
                  <div
                    key={i}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDropSelect(place)}
                  >
                    <p className="font-semibold">{place.name}</p>
                    <p className="text-gray-500 text-sm">{place.address}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ------------------- STEP 3: SUMMARY ------------------- */}
        {step === "summary" && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Ride Summary
            </h2>

            <div className="border rounded-xl p-4 bg-gray-50 mb-4">
              <p className="font-semibold text-gray-900">RideGo Mini</p>
              <p className="text-gray-600 text-sm">Affordable everyday rides</p>
            </div>

            <button
              className="w-full bg-black text-white p-3 rounded-xl font-medium"
              onClick={handleConfirmRide}
            >
              Confirm Ride
            </button>
          </>
        )}

        {/* ------------------- STEP 4: SEARCHING ------------------- */}
        {step === "searching" && (
          <div className="flex flex-col items-center py-5">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-3" />
            <p className="font-medium text-gray-900">
              Searching for nearby drivers…
            </p>
          </div>
        )}

        {/* ------------------- STEP 5: DRIVER ASSIGNED ------------------- */}
        {step === "driver" && (
          <>
            <h2 className="text-lg font-semibold text-gray-900">
              Driver is on the way
            </h2>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="font-semibold text-gray-900">
                  {driverAssigned.name}
                </p>
                <p className="text-sm text-gray-700">
                  {driverAssigned.car} • {driverAssigned.plate}
                </p>
              </div>

              <div className="text-right">
                <p className="text-gray-600 text-sm">ETA</p>
                <p className="text-xl font-bold text-gray-900">
                  {driverAssigned.eta} min
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
