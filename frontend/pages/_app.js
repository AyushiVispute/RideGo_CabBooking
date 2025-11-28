import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Component {...pageProps} />
      </div>
    </div>
  );
}