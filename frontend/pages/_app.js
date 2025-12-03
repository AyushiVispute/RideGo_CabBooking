import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import "../styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
