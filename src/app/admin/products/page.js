"use client";
import { useEffect, useState } from "react";
import AdminProducts from "@/components/admin/AdminProducts";
import { apiFetch } from "@/lib/api";

export default function AdminProductsPage() {
  const [state, setState] = useState(null);
  useEffect(() => {
    Promise.all([
      apiFetch("/api/admin/products").then((r) => (r.ok ? r.json() : [])),
      apiFetch("/api/categories/all").then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([products, categories]) => setState({ products, categories }))
      .catch(() => setState({ products: [], categories: [] }));
  }, []);
  if (!state) return null;
  return <AdminProducts initialProducts={state.products} categories={state.categories} />;
}
