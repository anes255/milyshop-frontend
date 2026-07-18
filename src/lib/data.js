import { apiGet } from "./api";
import { DEMO_CATEGORIES } from "./demo";

export const DEFAULT_SETTINGS = {
  id: "main",
  siteName: "Boutique MilyShop",
  logo: "/logo.svg",
  phone: "+213 555 000 000",
  email: "contact@milyshop.com",
  whatsapp: "+213555000000",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  address: "Alger, Algérie",
  footerText: "Boutique MilyShop — Fine Apparel & Design",
};

export async function getSettings() {
  const s = await apiGet("/api/settings", null);
  return { ...DEFAULT_SETTINGS, ...(s || {}) };
}

export async function getCategories() {
  const res = await apiGet("/api/categories", null);
  return res && res.length ? res : DEMO_CATEGORIES;
}

export async function getAllCategories() {
  const res = await apiGet("/api/categories/all", null);
  return res && res.length ? res : DEMO_CATEGORIES;
}
