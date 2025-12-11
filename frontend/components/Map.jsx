import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


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

// Car icon (Uber-style using rotation)
const getCarIcon = (angle) =>
  L.divIcon({
    html: `<img src="https://cdn-icons-png.flaticon.com/512/3202/3202926.png"
           style="width:40px;height:40px;transform:rotate(${angle}deg);" />`,
    iconSize: [40, 40],
    className: "",
  });

/* --------------------------------------------------
   AUTO FIT BOUNDS
-------------------------------------------------- */
function FitBounds({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds]);

  return null;
}

/* --------------------------------------------------
   MAIN MAP COMPONENT
-------------------------------------------------- */
export default function Map({ pickupPos, dropPos, startRideAnimation }) {
  const [userPos, setUserPos] = useState(null);
  const [route, setRoute] = useState([]);
  const [driverPos, setDriverPos] = useState(null);
  const [carAngle, setCarAngle] = useState(0);

  /* ----------------------- USER LOCATION ---------------------- */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => console.warn("Location blocked")
    );
  }, []);

  /* ----------------------- FETCH ROUTE (OSRM) ---------------------- */
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
        setDriverPos(coords[0]); // Start car at first point
      })
      .catch(() => console.warn("Routing error"));
  }, [pickupPos, dropPos]);

  /* ----------------------- CAR ANIMATION ---------------------- */
  useEffect(() => {
    if (!startRideAnimation || route.length < 2) return;

    let index = 0;
    let progress = 0;
    let lastTime = null;
    const SPEED = 0.002; // Uber-like smooth speed

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      progress += delta * SPEED;

      if (progress >= 1) {
        progress = 0;
        index++;
        if (index >= route.length - 1) return; // End of route
      }

      const p1 = route[index];
      const p2 = route[index + 1];

      // Interpolate car position
      const lat = p1[0] + (p2[0] - p1[0]) * progress;
      const lng = p1[1] + (p2[1] - p1[1]) * progress;

      setDriverPos([lat, lng]);

      // Car direction angle
      const dx = p2[1] - p1[1];
      const dy = p2[0] - p1[0];
      setCarAngle((Math.atan2(dy, dx) * 180) / Math.PI);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [startRideAnimation, route]);

  return (
    <div className="relative max-w-2xl mx-auto mt-6">
      <MapContainer
        center={userPos || { lat: 18.5204, lng: 73.8567 }} // Default Pune
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* ⭐ CARTO Voyager Light Theme (Google-like, free) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="© CARTO"
          subdomains={["a", "b", "c", "d"]}
        />

        {/* Fit to route */}
        {route.length > 1 && <FitBounds bounds={route} />}

        {/* User Marker */}
        {userPos && <Marker position={userPos} icon={userIcon} />}

        {/* Pickup & Drop */}
        {pickupPos && <Marker position={pickupPos} icon={pickupIcon} />}
        {dropPos && <Marker position={dropPos} icon={dropIcon} />}

        {/* Route Polyline */}
        {route.length > 0 && (
          <Polyline positions={route} color="black" weight={5} opacity={0.9} />
        )}

        {/* Uber Car Marker */}
        {driverPos && <Marker position={driverPos} icon={getCarIcon(carAngle)} />}
      </MapContainer>
    </div>
  );
}
