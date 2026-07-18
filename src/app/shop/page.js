import { apiGet } from "@/lib/api";
import { getServerDict } from "@/lib/lang-server";
import { getAllCategories } from "@/lib/data";
import { DEMO_PRODUCTS } from "@/lib/demo";
import ProductGrid from "@/components/ProductGrid";
import ShopFilters from "@/components/ShopFilters";
import SortSelect from "@/components/SortSelect";

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }) {
  const { t } = getServerDict();
  const sp = searchParams || {};
  const categories = await getAllCategories();

  const qs = new URLSearchParams();
  if (sp.q) qs.set("q", sp.q);
  if (sp.category) qs.set("category", sp.category);
  if (sp.size) qs.set("size", sp.size);
  if (sp.color) qs.set("color", sp.color);
  if (sp.min) qs.set("min", sp.min);
  if (sp.max) qs.set("max", sp.max);
  if (sp.sort) qs.set("sort", sp.sort);

  let products = await apiGet(`/api/products?${qs.toString()}`, null);

  // Demo fallback (no backend): filter/sort the demo catalogue in memory
  if (products === null) {
    products = [...DEMO_PRODUCTS];
    if (sp.q) {
      const q = sp.q.toLowerCase();
      products = products.filter((p) => p.nameFr.toLowerCase().includes(q) || p.nameAr.includes(sp.q));
    }
    if (sp.category) {
      const cat = categories.find((c) => c.slug === sp.category);
      if (cat) products = products.filter((p) => p.categoryId === cat.id);
    }
    if (sp.size) products = products.filter((p) => p.sizes.includes(sp.size));
    if (sp.color) products = products.filter((p) => p.colors.includes(sp.color));
    if (sp.min) products = products.filter((p) => p.price >= Number(sp.min));
    if (sp.max) products = products.filter((p) => p.price <= Number(sp.max));
    if (sp.sort === "price-asc") products.sort((a, b) => a.price - b.price);
    else if (sp.sort === "price-desc") products.sort((a, b) => b.price - a.price);
    else if (sp.sort === "popular") products.sort((a, b) => b.sold - a.sold);
  }

  return (
    <div className="container-mily py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">{t.shop}</h1>
        {sp.q && <p className="text-gray-500 mt-1">{t.search}: “{sp.q}”</p>}
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <div className="hidden lg:block">
          <ShopFilters categories={categories} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">{products.length} {t.shop.toLowerCase()}</p>
            <SortSelect />
          </div>

          {/* mobile filters */}
          <details className="lg:hidden mb-6 border border-beige-dark p-4">
            <summary className="cursor-pointer font-medium">{t.filters}</summary>
            <div className="mt-4">
              <ShopFilters categories={categories} />
            </div>
          </details>

          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20 text-gray-400">{t.noProducts}</div>
          )}
        </div>
      </div>
    </div>
  );
}
