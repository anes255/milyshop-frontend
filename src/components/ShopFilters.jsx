"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLang } from "./LangProvider";
import { localizedName } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "36", "38", "40", "42"];
const COLORS = [
  ["Noir", "أسود", "#1a1a1a"],
  ["Blanc", "أبيض", "#ffffff"],
  ["Beige", "بيج", "#e8ded4"],
  ["Rouge", "أحمر", "#b23b3b"],
  ["Rose", "وردي", "#e6a4b4"],
  ["Bleu", "أزرق", "#3b5bb2"],
  ["Vert", "أخضر", "#3b7a57"],
  ["Doré", "ذهبي", "#b76e5b"],
];

export default function ShopFilters({ categories = [] }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const [minP, setMinP] = useState(params.get("min") || "");
  const [maxP, setMaxP] = useState(params.get("max") || "");

  const set = (key, val) => {
    const p = new URLSearchParams(params.toString());
    if (val === null || val === "" || p.get(key) === val) p.delete(key);
    else p.set(key, val);
    router.push(`/shop?${p.toString()}`);
  };

  const applyPrice = () => {
    const p = new URLSearchParams(params.toString());
    if (minP) p.set("min", minP); else p.delete("min");
    if (maxP) p.set("max", maxP); else p.delete("max");
    router.push(`/shop?${p.toString()}`);
  };

  const activeCat = params.get("category");
  const activeSize = params.get("size");
  const activeColor = params.get("color");

  return (
    <aside className="space-y-8">
      <div>
        <h3 className="font-semibold mb-3">{t.categories}</h3>
        <ul className="space-y-1.5 text-sm max-h-64 overflow-auto no-scrollbar">
          <li>
            <button onClick={() => set("category", null)} className={`hover:text-gold ${!activeCat ? "text-gold font-medium" : ""}`}>
              {t.allCategories}
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button onClick={() => set("category", c.slug)} className={`hover:text-gold ${activeCat === c.slug ? "text-gold font-medium" : ""}`}>
                {localizedName(c, lang)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t.price}</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={minP} onChange={(e) => setMinP(e.target.value)} placeholder="0" className="input py-2" />
          <span>-</span>
          <input type="number" value={maxP} onChange={(e) => setMaxP(e.target.value)} placeholder="∞" className="input py-2" />
        </div>
        <button onClick={applyPrice} className="btn-outline w-full mt-2 py-2 text-xs">{t.apply}</button>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t.size}</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} onClick={() => set("size", s)} className={`w-10 h-10 border text-sm ${activeSize === s ? "border-gold bg-gold text-white" : "border-beige-dark hover:border-gold"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t.color}</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(([fr, ar, hex]) => {
            const name = lang === "ar" ? ar : fr;
            return (
              <button
                key={fr}
                onClick={() => set("color", fr)}
                title={name}
                className={`w-8 h-8 rounded-full border-2 ${activeColor === fr ? "ring-2 ring-gold ring-offset-2" : ""}`}
                style={{ backgroundColor: hex, borderColor: hex === "#ffffff" ? "#ddd" : hex }}
              />
            );
          })}
        </div>
      </div>

      <button onClick={() => router.push("/shop")} className="text-sm text-gold hover:underline">
        {t.reset}
      </button>
    </aside>
  );
}
