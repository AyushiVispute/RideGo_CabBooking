import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="min-h-screen bg-gray-100">
        <Component {...pageProps} />
      </main>
    </>
  );
}

