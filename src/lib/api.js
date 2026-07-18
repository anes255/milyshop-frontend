// Base URL of the milyshop-backend API.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const TOKEN_KEY = "mily_admin_token";

// ---- admin token (client-side only) ----
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(t) {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

// Public GET used by server components. Never throws — returns `fallback`
// so pages still render (demo mode) if the backend is unreachable.
export async function apiGet(path, fallback = null) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

// Drop-in replacement for fetch() against the backend: prefixes the base URL
// and attaches the admin Bearer token. Returns the raw Response.
export function apiFetch(path, opts = {}) {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(`${API_URL}${path}`, { ...opts, headers, cache: "no-store" });
}
