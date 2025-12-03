import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import { apiPost } from "../utils/api";

// Leaflet Map (Client-only)
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const router = useRouter();

  const [pickupText, setPickupText] = useState("");
  const [dropText, setDropText] = useState("");

  const [pickupPos, setPickupPos] = useState(null);
  const [dropPos, setDropPos] = useState(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);

  const [stage, setStage] = useState("search");
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [startRideAnimation, setStartRideAnimation] = useState(false);

  const rideOptions = [
    {
      id: "auto",
      name: "Auto",
      desc: "Budget friendly auto ride",
      seats: 3,
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png",
      price: "100.00",
    },
    {
      id: "bike",
      name: "Bike",
      desc: "Fast solo travel",
      seats: 1,
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Motorcycle.png",
      price: "120.00",
    },
    {
      id: "mini",
      name: "Mini",
      desc: "Affordable compact car",
      seats: 4,
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png",
      price: "250.00",
    },
    {
      id: "Sedan",
      name: "Sedan",
      desc: "Comfortable sedan cars",
      seats: 4,
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png",
      price: "280.00",
    },
    {
      id: "Electric",
      name: "SUV",
      desc: "Affordable rides in electric vehicle",
      seats: 4,
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/UberComfort_Green.png",
      price: "300.00",
    },
    {
      id: "RideGO XL",
      name: "Premium",
      desc: "Affordable rides for large groups",
      seats: 6,
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png",
      price: "400.00",
    },
  ];

  /* ----------------------------------------------
     AUTOCOMPLETE LOCATION SEARCH
  ------------------------------------------------ */
  async function searchPlaces(query, setter) {
    if (!query || query.length < 3) {
      setter([]);
      return;
    }

    try {
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
    } catch (err) {
      console.error("Location search error:", err);
      setter([]);
    }
  }

  const handlePickupSelect = (place) => {
    setPickupText(place.name);
    setPickupPos({ lat: place.lat, lng: place.lng });
    setPickupSuggestions([]);
  };

  const handleDropSelect = (place) => {
    setDropText(place.name);
    setDropPos({ lat: place.lat, lng: place.lng });
    setDropSuggestions([]);
  };

  const handleSearchRides = () => {
    if (!pickupPos || !dropPos)
      return alert("Please select both pickup and drop.");
    setStage("rides");
  };

  const handleContinueFromRides = () => {
    if (!selectedRideId) return alert("Please select a ride.");
    setStage("confirm");
  };

  /* ------------------------------------------------
     ✅ NEW — SEND RIDE TO BACKEND + GO TO PAYMENT
  ------------------------------------------------ */
  const handleConfirmRide = async () => {
    if (!pickupPos || !dropPos || !selectedRideId) {
      alert("Pickup, drop & ride must be selected.");
      return;
    }

    // Prepare ride data for backend
    const selectedRide = rideOptions.find((r) => r.id === selectedRideId);

    const body = {
      pickup: pickupText,
      drop: dropText,
      fare: selectedRide?.price || 250,
    };

    try {
      const response = await apiPost("/rides/request", body);

      // Save ride ID for status page
      localStorage.setItem("ride_id", response.id);

      // Redirect to payment page
      router.push("/payment");
    } catch (err) {
      alert("Failed to create ride: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl lg:flex lg:h-screen lg:gap-6">
        
        {/* LEFT PANEL */}
        <div className="hidden lg:flex lg:w-[40%] lg:flex-col lg:p-6 lg:pt-10">
          <RidePanel
            variant="desktop"
            stage={stage}
            pickupText={pickupText}
            dropText={dropText}
            pickupSuggestions={pickupSuggestions}
            dropSuggestions={dropSuggestions}
            onPickupChange={(val) => {
              setPickupText(val);
              searchPlaces(val, setPickupSuggestions);
            }}
            onDropChange={(val) => {
              setDropText(val);
              searchPlaces(val, setDropSuggestions);
            }}
            onPickupSelect={handlePickupSelect}
            onDropSelect={handleDropSelect}
            onSearchRides={handleSearchRides}
            rideOptions={rideOptions}
            selectedRideId={selectedRideId}
            setSelectedRideId={setSelectedRideId}
            onContinueFromRides={handleContinueFromRides}
            onConfirmRide={handleConfirmRide}
            selectedRide={rideOptions.find((r) => r.id === selectedRideId)}
          />
        </div>

        {/* MAP */}
        <div className="relative w-full lg:w-[60%] lg:p-6 lg:pt-8">
          <div className="h-[420px] lg:h-full rounded-2xl overflow-hidden shadow">
            <Map pickupPos={pickupPos} dropPos={dropPos} startRideAnimation={startRideAnimation} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   RIDE PANEL COMPONENT (UI ONLY — unchanged)
----------------------------------------------------------- */
function RidePanel({
  variant,
  stage,
  pickupText,
  dropText,
  pickupSuggestions,
  dropSuggestions,
  onPickupChange,
  onDropChange,
  onPickupSelect,
  onDropSelect,
  onSearchRides,
  rideOptions,
  selectedRideId,
  setSelectedRideId,
  onContinueFromRides,
  onConfirmRide,
  selectedRide,
}) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "bg-white rounded-t-3xl shadow-xl p-6 max-w-xl mx-auto border border-gray-200"
          : "bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
      }
    >
      {isMobile && <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />}

      {/* SEARCH */}
      {stage === "search" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-black">Request a ride</h1>

          {/* PICKUP */}
          <div className="relative mb-4">
            <FiMapPin className="absolute left-3 top-3 text-gray-600 text-xl" />
            <input
              className="w-full border p-3 pl-11 rounded-xl bg-gray-50 text-black placeholder-gray-500"
              placeholder="Pickup location"
              value={pickupText}
              onChange={(e) => onPickupChange(e.target.value)}
            />
          </div>

          {/* Pickup Suggestions */}
          {pickupSuggestions.length > 0 && (
            <div className="border bg-white rounded-xl shadow max-h-48 overflow-y-auto mb-3">
              {pickupSuggestions.map((place, i) => (
                <div
                  key={i}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onPickupSelect(place)}
                >
                  <p className="font-semibold text-black">{place.name}</p>
                  <p className="text-sm text-gray-700">{place.address}</p>
                </div>
              ))}
            </div>
          )}

          {/* DROPOFF */}
          <div className="relative mb-4">
            <FiNavigation className="absolute left-3 top-3 text-gray-600 text-xl" />
            <input
              className="w-full border p-3 pl-11 rounded-xl bg-gray-50 text-black placeholder-gray-500"
              placeholder="Dropoff location"
              value={dropText}
              onChange={(e) => onDropChange(e.target.value)}
            />
          </div>

          {/* Drop Suggestions */}
          {dropSuggestions.length > 0 && (
            <div className="border bg-white rounded-xl shadow max-h-48 overflow-y-auto mb-3">
              {dropSuggestions.map((place, i) => (
                <div
                  key={i}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onDropSelect(place)}
                >
                  <p className="font-semibold text-black">{place.name}</p>
                  <p className="text-sm text-gray-700">{place.address}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onSearchRides}
            className="w-full bg-black text-white p-3 rounded-xl mt-2 font-semibold"
          >
            Search rides
          </button>
        </>
      )}

      {/* RIDE OPTIONS */}
      {stage === "rides" && (
        <>
          <h2 className="text-xl font-bold mb-3 text-black">Choose a ride</h2>
          <p className="text-gray-600 mb-3 text-sm">Rides near you</p>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {rideOptions.map((ride) => {
              const active = ride.id === selectedRideId;

              return (
                <button
                  key={ride.id}
                  onClick={() => setSelectedRideId(ride.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition shadow-sm
                    ${
                      active
                        ? "border-black shadow-md bg-white"
                        : "border-gray-300 bg-white hover:border-black"
                    }
                  `}
                >
                  <img src={ride.img} className="w-20 h-20 object-contain mr-4" />

                  <div className="flex flex-col flex-grow text-left">
                    <p className="font-bold text-lg text-black flex items-center gap-1">
                      {ride.name}
                      {ride.seats && (
                        <span className="text-sm text-gray-700">• {ride.seats}</span>
                      )}
                    </p>

                    <p className="text-sm text-gray-600">
                      2 mins away •{" "}
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    <p className="text-sm text-gray-700 mt-1">{ride.desc}</p>
                  </div>

                  <div className="text-right font-semibold text-lg text-black whitespace-nowrap">
                    ₹{ride.price}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={onContinueFromRides}
            className="w-full bg-black text-white p-3 rounded-xl mt-4 font-semibold"
          >
            Continue
          </button>
        </>
      )}

      {/* CONFIRM PICKUP */}
      {stage === "confirm" && selectedRide && (
        <>
          <h2 className="text-xl font-bold mb-3 text-black">Confirm pickup</h2>

          <div className="flex items-center justify-between border rounded-3xl p-4 mb-5 bg-gray-50 shadow">
            <div className="flex items-center gap-4">
              <img src={selectedRide.img} className="w-16 h-16" />
              <div>
                <p className="font-semibold text-lg text-black">{selectedRide.name}</p>
                <p className="text-sm text-gray-600">{selectedRide.desc}</p>
              </div>
            </div>

            <div className="text-right font-semibold text-lg text-black">
              ₹{selectedRide.price}
            </div>
          </div>

          <button
            onClick={onConfirmRide}
            className="w-full bg-black text-white p-3 rounded-xl font-semibold"
          >
            Confirm pickup
          </button>
        </>
      )}

      {/* ANIMATION */}
      {stage === "animate" && (
        <>
          <h2 className="text-xl font-bold mb-2">Driver is on the way</h2>
          <p className="text-gray-600 text-sm">Watch the car move on the map.</p>
        </>
      )}
    </div>
  );
}
