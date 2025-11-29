import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

// Fix marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

// Custom driver icon
const driverIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
  iconSize: [40, 40],
});

export default function Map({ pickupPos, dropPos }) {
  const [routePoints, setRoutePoints] = useState([]);
  const [driverPos, setDriverPos] = useState(null);

  // Get the map and auto-fit to route
  const FitBounds = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
      if (bounds && bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [bounds]);
    return null;
  };

  // Fetch route from OSRM
  useEffect(() => {
    if (!pickupPos || !dropPos) return;

    const url = `https://router.project-osrm.org/route/v1/driving/${pickupPos.lng},${pickupPos.lat};${dropPos.lng},${dropPos.lat}?overview=full&geometries=geojson`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const coords = data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);
        setRoutePoints(coords);
        setDriverPos(coords[0]); // Start driver at first point
      });
  }, [pickupPos, dropPos]);

  // Driver movement simulation
  useEffect(() => {
    if (routePoints.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < routePoints.length) {
        setDriverPos(routePoints[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [routePoints]);

  const bounds = routePoints.length ? routePoints : null;

  return (
    <MapContainer
      center={pickupPos || { lat: 19.0760, lng: 72.8777 }}
      zoom={14}
      style={{ height: "300px", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Markers */}
      {pickupPos && <Marker position={pickupPos} />}
      {dropPos && <Marker position={dropPos} />}

      {/* Route polyline */}
      {routePoints.length > 0 && (
        <Polyline positions={routePoints} color="blue" weight={4} />
      )}

      {/* Driver moving marker */}
      {driverPos && <Marker position={driverPos} icon={driverIcon} />}

      {/* Auto-fit map to route */}
      {bounds && <FitBounds bounds={bounds} />}
    </MapContainer>
  );
}
