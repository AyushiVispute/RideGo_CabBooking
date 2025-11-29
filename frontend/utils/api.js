export const API = "http://localhost:8000"; // or 127.0.0.1:8000 if you prefer

export async function apiPost(url, data) {
  try {
    const res = await fetch(API + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    let json = {};

    try {
      json = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Could not parse JSON:", text);
    }

    if (!res.ok) {
      console.error("API error:", res.status, json);

      let msg = "API Error";

      // detail is a string
      if (typeof json.detail === "string") {
        msg = json.detail;
      }
      // detail is a list of errors (422 from FastAPI)
      else if (Array.isArray(json.detail)) {
        msg = json.detail.map((d) => d.msg || JSON.stringify(d)).join(", ");
      }
      // generic message field
      else if (typeof json.message === "string") {
        msg = json.message;
      } else {
        msg = `HTTP ${res.status}`;
      }

      throw new Error(msg);
    }

    return json;
  } catch (err) {
    console.error("Fetch failed:", err);
    throw err;
  }
}
