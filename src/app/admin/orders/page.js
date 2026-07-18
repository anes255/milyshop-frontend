"use client";
import { useEffect, useState } from "react";
import AdminOrders from "@/components/admin/AdminOrders";
import { apiFetch } from "@/lib/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    apiFetch("/api/admin/orders")
      .then((r) => (r.ok ? r.json() : []))
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);
  if (!orders) return null;
  return <AdminOrders initial={orders} />;
}
