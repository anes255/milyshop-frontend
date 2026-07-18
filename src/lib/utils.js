export function formatPrice(v, cur = "DA") {
  const n = Number(v || 0);
  return `${n.toLocaleString("fr-FR")} ${cur}`;
}

export function localizedName(item, lang) {
  if (!item) return "";
  return lang === "ar" ? item.nameAr || item.nameFr : item.nameFr || item.nameAr;
}

export function localizedDesc(item, lang) {
  if (!item) return "";
  return lang === "ar"
    ? item.descriptionAr || item.descriptionFr
    : item.descriptionFr || item.descriptionAr;
}

export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function effectivePrice(p) {
  return p.discountPrice && p.discountPrice > 0 ? p.discountPrice : p.price;
}
