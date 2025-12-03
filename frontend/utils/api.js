export const API = "http://localhost:8000";

/* ===========================
   POST REQUEST
=========================== */
export async function apiPost(url, data) {
  const res = await fetch(API + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  let json = {};

  // Try parse JSON
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    console.error("❌ Server returned invalid JSON:", text);
  }

  // Handle error
  if (!res.ok) {
    let msg =
      json.detail ||
      json.message ||
      json.error ||
      `HTTP ${res.status}`;

    // If detail is list (FastAPI validation errors)
    if (Array.isArray(json.detail)) {
      msg = json.detail
        .map((d) => d.msg || JSON.stringify(d))
        .join(", ");
    }

    // Convert object → readable string
    if (typeof msg !== "string") {
      msg = JSON.stringify(msg);
    }

    throw new Error(msg);
  }

  return json;
}

/* ===========================
   GET REQUEST
=========================== */
export async function apiGet(url) {
  const res = await fetch(API + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const text = await res.text();
  let json = {};

  try {
    json = text ? JSON.parse(text) : {};
  } catch (err) {
    console.error("❌ Invalid JSON from server (GET):", text);
  }

  if (!res.ok) {
    let msg =
      json.detail ||
      json.message ||
      json.error ||
      `HTTP ${res.status}`;

    // Convert object → string
    if (typeof msg !== "string") {
      msg = JSON.stringify(msg);
    }

    throw new Error(msg);
  }

  return json;
}
