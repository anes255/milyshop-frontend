"use client";
import { useEffect, useState } from "react";
import AdminCategories from "@/components/admin/AdminCategories";
import { apiFetch } from "@/lib/api";

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState(null);
  useEffect(() => {
    apiFetch("/api/admin/categories")
      .then((r) => (r.ok ? r.json() : []))
      .then(setCats)
      .catch(() => setCats([]));
  }, []);
  if (!cats) return null;
  return <AdminCategories initial={cats} />;
}
