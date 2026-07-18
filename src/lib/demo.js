// Fallback demo content used ONLY when the database is unreachable
// (e.g. before DATABASE_URL is configured), so the site still renders.
const IMG = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=700",
  "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=700",
];

export const DEMO_CATEGORIES = [
  { id: "c1", nameFr: "Robes", nameAr: "فساتين", slug: "dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", children: [] },
  { id: "c2", nameFr: "Hauts", nameAr: "بلوزات", slug: "tops", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600", children: [] },
  { id: "c3", nameFr: "Pantalons", nameAr: "سراويل", slug: "pants", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600", children: [] },
  { id: "c4", nameFr: "Vestes & Manteaux", nameAr: "سترات ومعاطف", slug: "jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600", children: [] },
  { id: "c5", nameFr: "Sacs", nameAr: "حقائب", slug: "bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600", children: [] },
  { id: "c6", nameFr: "Chaussures", nameAr: "أحذية", slug: "shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600", children: [] },
  { id: "c7", nameFr: "Mode modeste", nameAr: "أزياء محتشمة", slug: "modest", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", children: [] },
  { id: "c8", nameFr: "Accessoires", nameAr: "إكسسوارات", slug: "accessories", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600", children: [] },
];

const NAMES = [
  ["Robe fluide élégante", "فستان أنيق انسيابي", "c1"],
  ["Blouse en soie", "بلوزة حريرية", "c2"],
  ["Pantalon taille haute", "سروال بخصر عالٍ", "c3"],
  ["Manteau long camel", "معطف طويل بلون الجمل", "c4"],
  ["Sac à main cuir", "حقيبة يد جلدية", "c5"],
  ["Escarpins classiques", "حذاء كلاسيكي", "c6"],
  ["Abaya brodée", "عباية مطرزة", "c7"],
  ["Robe de soirée", "فستان سهرة", "c1"],
];

export const DEMO_PRODUCTS = NAMES.map(([nameFr, nameAr, categoryId], i) => {
  const price = 3000 + i * 500;
  const disc = i % 3 === 0;
  return {
    id: `p${i}`,
    nameFr, nameAr,
    slug: `demo-${i}`,
    descriptionFr: "Pièce raffinée confectionnée dans un tissu de qualité supérieure. Coupe moderne et élégante.",
    descriptionAr: "قطعة أنيقة مصنوعة من قماش عالي الجودة. قصة عصرية وراقية.",
    price,
    discountPrice: disc ? Math.round(price * 0.8) : null,
    images: [IMG[i % IMG.length], IMG[(i + 1) % IMG.length], IMG[(i + 2) % IMG.length]],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Beige", "Rose"],
    stock: 12,
    brand: "MilyShop",
    featured: i < 6,
    newArrival: i % 2 === 0,
    bestSeller: i % 3 === 0,
    sold: 50 - i,
    categoryId,
    createdAt: new Date().toISOString(),
  };
});
