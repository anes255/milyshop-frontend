"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "./LangProvider";

export default function SortSelect() {
  const { t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("sort") || "newest";

  const change = (e) => {
    const p = new URLSearchParams(params.toString());
    p.set("sort", e.target.value);
    router.push(`/shop?${p.toString()}`);
  };

  return (
    <select value={current} onChange={change} className="border border-beige-dark px-3 py-2 text-sm outline-none focus:border-gold bg-white">
      <option value="newest">{t.newest}</option>
      <option value="price-asc">{t.priceLow}</option>
      <option value="price-desc">{t.priceHigh}</option>
      <option value="popular">{t.popular}</option>
    </select>
  );
}
