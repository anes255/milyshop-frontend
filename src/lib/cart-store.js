"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      addItem: (item) =>
        set((state) => {
          const key = `${item.productId}-${item.size || ""}-${item.color || ""}`;
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, key }] };
        }),
      updateQty: (key, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, quantity: Math.max(1, quantity) } : i))
            .filter((i) => i.quantity > 0),
        })),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [], coupon: null }),
      setCoupon: (coupon) => set({ coupon }),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    { name: "mily-cart" }
  )
);
