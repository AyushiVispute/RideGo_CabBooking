export const API = "http://localhost:8000";

export async function apiPost(url, data) {
  const res = await fetch(API + url, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  let json = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    console.error("Invalid JSON from server:", text);
  }

  if (!res.ok) {
    let msg = json.detail || json.message || `HTTP ${res.status}`;
    if (Array.isArray(json.detail)) {
      msg = json.detail.map((d) => d.msg || JSON.stringify(d)).join(", ");
    }
    throw new Error(msg);
  }

  return json;
}
export async function apiGet(url) {
  const res = await fetch(API + url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const text = await res.text();
  let json = {};

  try {
    json = text ? JSON.parse(text) : {};
  } catch (err) {
    console.error("Invalid JSON from server (GET):", text);
  }

  if (!res.ok) {
    let msg = json.detail || json.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return json;
}

