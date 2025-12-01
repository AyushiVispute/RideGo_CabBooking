import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

/* -----------------------------
   MARKER ICONS
------------------------------ */

// User icon
const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Pickup icon
const pickupIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});

// Drop icon
const dropIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});

// Car icon (rotates)
const getCarIcon = (angle) =>
  L.divIcon({
    html: `<img src="https://cdn-icons-png.flaticon.com/512/3202/3202926.png"
             style="width:40px;height:40px;transform:rotate(${angle}deg);" />`,
    iconSize: [40, 40],
    className: "",
  });

/* -----------------------------
   FIT MAP TO ROUTE
------------------------------ */

function FitBounds({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds]);

  return null;
}

/* -----------------------------
   MAIN MAP
------------------------------ */

export default function Map({ pickupPos, dropPos, startRideAnimation }) {
  const [userPos, setUserPos] = useState(null);
  const [route, setRoute] = useState([]);
  const [driverPos, setDriverPos] = useState(null);
  const [angle, setAngle] = useState(0);

  // Get user GPS position
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => console.warn("Location permission denied")
    );
  }, []);

  // Fetch route from OSRM when pickup + drop set
  useEffect(() => {
    if (!pickupPos || !dropPos) {
      setRoute([]);
      setDriverPos(null);
      return;
    }

    const url = `https://router.project-osrm.org/route/v1/driving/${pickupPos.lng},${pickupPos.lat};${dropPos.lng},${dropPos.lat}?overview=full&geometries=geojson`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.routes || !data.routes[0]) return;

        const coords = data.routes[0].geometry.coordinates.map((c) => [
          c[1],
          c[0],
        ]);

        setRoute(coords);
        setDriverPos(coords[0]); // start at route beginning
      })
      .catch((e) => console.error("Route error:", e));
  }, [pickupPos, dropPos]);

  // Smooth Uber-like car animation
  useEffect(() => {
    if (!startRideAnimation || route.length < 2) return;

    let index = 0;
    let progress = 0;
    let lastTime = null;
    const SPEED = 0.002; // lower = slower

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      progress += delta * SPEED;

      if (progress >= 1) {
        progress = 0;
        index++;
        if (index >= route.length - 1) return; // finished route
      }

      const p1 = route[index];
      const p2 = route[index + 1];

      const lat = p1[0] + (p2[0] - p1[0]) * progress;
      const lng = p1[1] + (p2[1] - p1[1]) * progress;

      setDriverPos([lat, lng]);

      const dx = p2[1] - p1[1];
      const dy = p2[0] - p1[0];
      setAngle((Math.atan2(dy, dx) * 180) / Math.PI);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [startRideAnimation, route]);

  return (
    <div className="relative max-w-2xl mx-auto mt-8">
      <MapContainer
        center={userPos || { lat: 18.52, lng: 73.85 }} // Pune default
        zoom={12}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* ⭐ MapMyIndia / Mappls light-style map (Google-like) */}
       <TileLayer
            url={`https://apis.mapmyindia.com/advancedmaps/v1/1f6445c88fe674c4ca37ad8471d65112/streets/{z}/{x}/{y}.png`}
            attribution="© MapmyIndia"
          />

        {/* Auto-fit to route */}
        {route.length > 1 && <FitBounds bounds={route} />}

        {/* User marker */}
        {userPos && <Marker position={userPos} icon={userIcon} />}

        {/* Pickup & Drop markers */}
        {pickupPos && <Marker position={pickupPos} icon={pickupIcon} />}
        {dropPos && <Marker position={dropPos} icon={dropIcon} />}

        {/* Route polyline */}
        {route.length > 0 && (
          <Polyline positions={route} color="cyan" weight={6} opacity={0.9} />
        )}

        {/* Moving car */}
        {driverPos && <Marker position={driverPos} icon={getCarIcon(angle)} />}
      </MapContainer>
    </div>
  );
}