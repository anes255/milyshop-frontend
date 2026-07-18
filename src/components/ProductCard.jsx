"use client";
import Link from "next/link";
import { useLang } from "./LangProvider";
import { useCart } from "@/lib/cart-store";
import { formatPrice, localizedName, effectivePrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  const { lang, t } = useLang();
  const addItem = useCart((s) => s.addItem);
  const img = product.images?.[0] || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600";
  const hasDiscount = product.discountPrice && product.discountPrice > 0;
  const price = effectivePrice(product);
  const soldOut = product.stock <= 0;

  const quickAdd = (e) => {
    e.preventDefault();
    if (soldOut) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: localizedName(product, lang),
      image: img,
      price,
      size: product.sizes?.[0] || null,
      color: product.colors?.[0] || null,
      quantity: 1,
    });
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block fade-up">
      <div className="relative overflow-hidden bg-beige aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={localizedName(product, lang)} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute top-3 start-3 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-gold text-white text-[11px] px-2 py-1">
              -{Math.round((1 - product.discountPrice / product.price) * 100)}%
            </span>
          )}
          {product.newArrival && <span className="bg-ink text-white text-[11px] px-2 py-1">{t.newArrivals}</span>}
        </div>
        {soldOut && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-ink font-medium tracking-wide">{t.outOfStock}</span>
          </div>
        )}
        {!soldOut && (
          <button
            onClick={quickAdd}
            className="absolute bottom-0 inset-x-0 bg-ink text-white text-sm py-3 translate-y-full group-hover:translate-y-0 transition"
          >
            {t.addToCart}
          </button>
        )}
      </div>
      <div className="pt-3 text-center">
        <h3 className="text-sm font-medium text-ink line-clamp-1">{localizedName(product, lang)}</h3>
        {product.brand && <p className="text-xs text-gray-400">{product.brand}</p>}
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-gold font-semibold">{formatPrice(price, t.currency)}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.price, t.currency)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
