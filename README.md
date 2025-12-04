🚕 Ride-Go — Cab Booking System

Ride-Go is a simple cab-booking web application where users can enter pickup/drop locations, view routes on a map, and simulate UPI payments. This project was developed as part of an internship assignment.

⭐ Features

🔐 User Login & Signup

🚗 Book Ride (Pickup & Drop input)

🗺️ Live Map using Leaflet

📍 Detect Current Location

➡️ Route Display on Map

💳 UPI Payment Screen (Google Pay / PhonePe / Paytm UI)

📱 Responsive UI

🛠 Tech Stack

Frontend: React / Next.js

Maps: Leaflet + OpenStreetMap

Auth: JWT (if backend used)

Styling: Tailwind CSS

API: Axios / Fetch

📂 Project Structure
/src
 ├── components
 │    ├── Map.jsx
 │    ├── PaymentUI.jsx
 │    └── Navbar.jsx
 ├── pages
 │    ├── index.jsx
 │    ├── book.jsx
 │    ├── login.jsx
 │    └── signup.jsx
 ├── utils/api.js
 └── styles

🚀 Run Project
1️⃣ Install Dependencies
npm install

2️⃣ Start Development
npm run dev

3️⃣ Open Browser
http://localhost:3000

🔑 Environment Variables

Create .env.local:

NEXT_PUBLIC_MAP_API_KEY=your_key_here

👩‍💻 Author

Ayushi Vispute
Internship Project — Ride Booking System (Ride-Go)