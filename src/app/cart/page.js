"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { apiFetch } from "@/lib/api";

export default function CartPage() {
  const { t } = useLang();
  const { items, updateQty, removeItem, coupon, setCoupon } = useCart();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const total = subtotal - discount;

  const applyCoupon = async () => {
    setErr("");
    try {
      const res = await apiFetch(`/api/coupon?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.valid) setCoupon({ code: data.code, percent: data.percent });
      else { setErr(t.invalidCoupon); setCoupon(null); }
    } catch { setErr(t.invalidCoupon); }
  };

  if (items.length === 0) {
    return (
      <div className="container-mily py-24 text-center">
        <h1 className="text-3xl font-semibold mb-4">{t.yourCart}</h1>
        <p className="text-gray-400 mb-8">{t.emptyCart}</p>
        <Link href="/shop" className="btn-gold">{t.continueShopping}</Link>
      </div>
    );
  }

  return (
    <div className="container-mily py-10">
      <h1 className="text-3xl font-semibold mb-8">{t.yourCart}</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.key} className="flex gap-4 border-b border-beige-dark pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.image} alt={i.name} className="w-24 h-32 object-cover bg-beige" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <Link href={`/product/${i.slug}`} className="font-medium hover:text-gold">{i.name}</Link>
                  <button onClick={() => removeItem(i.key)} className="text-gray-400 hover:text-red-500 text-sm">{t.remove}</button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {i.size && <span>{t.size}: {i.size} </span>}
                  {i.color && <span> · {t.color}: {i.color}</span>}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-beige-dark">
                    <button onClick={() => updateQty(i.key, i.quantity - 1)} className="w-9 h-9">−</button>
                    <span className="w-10 text-center text-sm">{i.quantity}</span>
                    <button onClick={() => updateQty(i.key, i.quantity + 1)} className="w-9 h-9">+</button>
                  </div>
                  <span className="text-gold font-semibold">{formatPrice(i.price * i.quantity, t.currency)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-beige p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">{t.orderSummary}</h2>
          <div className="flex gap-2 mb-4">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={t.coupon} className="input py-2 bg-white" />
            <button onClick={applyCoupon} className="btn-outline py-2 px-4 text-xs">{t.applyCoupon}</button>
          </div>
          {coupon && <p className="text-gold text-sm mb-2">{coupon.code} (-{coupon.percent}%)</p>}
          {err && <p className="text-red-500 text-sm mb-2">{err}</p>}
          <div className="space-y-2 text-sm border-t border-beige-dark pt-4">
            <div className="flex justify-between"><span>{t.subtotal}</span><span>{formatPrice(subtotal, t.currency)}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>{t.discount}</span><span>-{formatPrice(discount, t.currency)}</span></div>}
            <div className="flex justify-between text-lg font-semibold border-t border-beige-dark pt-2"><span>{t.total}</span><span className="text-gold">{formatPrice(total, t.currency)}</span></div>
          </div>
          <Link href="/checkout" className="btn-gold w-full mt-6">{t.checkout}</Link>
          <Link href="/shop" className="block text-center text-sm text-gray-500 mt-3 hover:text-gold">{t.continueShopping}</Link>
        </div>
      </div>
    </div>
  );
}
