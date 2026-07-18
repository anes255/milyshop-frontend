import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { getServerDict } from "@/lib/lang-server";
import { DEMO_PRODUCTS } from "@/lib/demo";
import ProductDetail from "@/components/ProductDetail";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { t } = getServerDict();
  const data = await apiGet(`/api/products/${params.slug}`, null);
  let product = data?.product || null;
  let related = data?.related || [];

  // Demo fallback (no backend / not found upstream)
  if (!product) {
    product = DEMO_PRODUCTS.find((p) => p.slug === params.slug) || null;
    if (product) {
      related = DEMO_PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
    }
  }
  if (!product) return notFound();

  return (
    <div className="container-mily py-10">
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold mb-6">{t.relatedProducts}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
