"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "./LangProvider";
import { useCart } from "@/lib/cart-store";
import { formatPrice, localizedName, localizedDesc, effectivePrice } from "@/lib/utils";

const COLOR_HEX = {
  Noir: "#1a1a1a", Blanc: "#ffffff", Beige: "#e8ded4", Rouge: "#b23b3b",
  Rose: "#e6a4b4", Bleu: "#3b5bb2", Vert: "#3b7a57", Doré: "#b76e5b",
};

export default function ProductDetail({ product }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const images = product.images?.length ? product.images : ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"];
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes?.[0] || null);
  const [color, setColor] = useState(product.colors?.[0] || null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = effectivePrice(product);
  const hasDiscount = product.discountPrice && product.discountPrice > 0;
  const soldOut = product.stock <= 0;

  const add = (buyNow) => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: localizedName(product, lang),
      image: images[0],
      price,
      size,
      color,
      quantity: qty,
    });
    if (buyNow) router.push("/cart");
    else { setAdded(true); setTimeout(() => setAdded(false), 1500); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <div className="aspect-[3/4] bg-beige overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[active]} alt={localizedName(product, lang)} className="w-full h-full object-cover" />
        </div>
        {images.length > 1 && (
          <div className="flex gap-3 mt-3">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-20 h-24 overflow-hidden border-2 ${active === i ? "border-gold" : "border-transparent"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        {product.brand && <p className="text-gray-400 text-sm">{product.brand}</p>}
        <h1 className="text-3xl md:text-4xl font-semibold mt-1">{localizedName(product, lang)}</h1>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl text-gold font-semibold">{formatPrice(price, t.currency)}</span>
          {hasDiscount && <span className="text-lg text-gray-400 line-through">{formatPrice(product.price, t.currency)}</span>}
        </div>

        <p className={`mt-2 text-sm ${soldOut ? "text-red-500" : "text-green-600"}`}>
          {soldOut ? t.outOfStock : `${t.inStock} (${product.stock})`}
        </p>

        {product.sizes?.length > 0 && (
          <div className="mt-6">
            <p className="label">{t.size}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-[44px] h-11 px-3 border text-sm ${size === s ? "border-gold bg-gold text-white" : "border-beige-dark hover:border-gold"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors?.length > 0 && (
          <div className="mt-6">
            <p className="label">{t.color}: <span className="text-gray-500 font-normal">{color}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)} title={c} className={`w-9 h-9 rounded-full border-2 ${color === c ? "ring-2 ring-gold ring-offset-2" : ""}`} style={{ backgroundColor: COLOR_HEX[c] || "#ccc", borderColor: "#ddd" }} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center border border-beige-dark">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 text-lg">−</button>
            <span className="w-12 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-11 h-11 text-lg">+</button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button disabled={soldOut} onClick={() => add(false)} className="btn-outline flex-1 disabled:opacity-40">
            {added ? t.added : t.addToCart}
          </button>
          <button disabled={soldOut} onClick={() => add(true)} className="btn-gold flex-1 disabled:opacity-40">
            {t.checkout}
          </button>
        </div>

        {(localizedDesc(product, lang)) && (
          <div className="mt-8 border-t border-beige-dark pt-6">
            <h3 className="font-semibold mb-2">{t.description}</h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{localizedDesc(product, lang)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
