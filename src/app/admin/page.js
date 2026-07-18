"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useLang } from "@/components/LangProvider";
import { getAdminDict } from "@/lib/admin-i18n";
import { apiFetch } from "@/lib/api";

const STATUS_COLOR = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const ICONS = {
  sales: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  orders: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  customers: "M12 8a4 4 0 1 0 0-8M4 20c0-4 4-6 8-6s8 2 8 6",
  products: "M20 7 12 3 4 7v10l8 4 8-4V7zM4 7l8 4 8-4",
};

function Stat({ label, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige-dark">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <span className="w-11 h-11 rounded-full bg-beige flex items-center justify-center text-gold">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d={ICONS[icon]} /></svg>
        </span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { lang } = useLang();
  const t = getAdminDict(lang);
  const [data, setData] = useState(null);

  useEffect(() => {
    apiFetch("/api/admin/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => setData({ totalSales: 0, ordersCount: 0, customers: 0, products: 0, recent: [] }));
  }, []);

  const d = data || { totalSales: 0, ordersCount: 0, customers: 0, products: 0, recent: [] };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{t.dashboard}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Stat label={t.totalSales} value={formatPrice(d.totalSales)} icon="sales" />
        <Stat label={t.orders} value={d.ordersCount} icon="orders" />
        <Stat label={t.customers} value={d.customers} icon="customers" />
        <Stat label={t.products} value={d.products} icon="products" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-beige-dark overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-beige-dark">
          <h2 className="font-semibold">{t.recentOrders}</h2>
          <Link href="/admin/orders" className="text-sm text-gold hover:underline">{t.viewAll}</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-beige/50 text-gray-500">
              <tr>
                <th className="text-start p-4">#</th>
                <th className="text-start p-4">{t.client}</th>
                <th className="text-start p-4">{t.total}</th>
                <th className="text-start p-4">{t.status}</th>
                <th className="text-start p-4">{t.date}</th>
              </tr>
            </thead>
            <tbody>
              {d.recent.map((o) => (
                <tr key={o.id} className="border-t border-beige-dark">
                  <td className="p-4 font-mono text-xs">{o.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4">{o.fullName}</td>
                  <td className="p-4">{formatPrice(o.total)}</td>
                  <td className="p-4"><span className={`text-xs px-2 py-1 rounded ${STATUS_COLOR[o.status]}`}>{t[o.status]}</span></td>
                  <td className="p-4 text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {d.recent.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400">{t.noOrders}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
