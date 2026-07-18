"use client";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useLang } from "@/components/LangProvider";
import { getAdminDict } from "@/lib/admin-i18n";
import { apiFetch } from "@/lib/api";

export default function AdminCustomersPage() {
  const { lang } = useLang();
  const t = getAdminDict(lang);
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    apiFetch("/api/admin/customers")
      .then((r) => (r.ok ? r.json() : []))
      .then(setCustomers)
      .catch(() => setCustomers([]));
  }, []);

  const list = customers || [];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{t.customers} ({list.length})</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-beige-dark overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-beige/50 text-gray-500">
            <tr>
              <th className="text-start p-4">{t.name}</th>
              <th className="text-start p-4">{t.phone}</th>
              <th className="text-start p-4">{t.address}</th>
              <th className="text-start p-4">{t.orders}</th>
              <th className="text-start p-4">{t.totalSpent}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c, i) => (
              <tr key={i} className="border-t border-beige-dark">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-gray-500">{c.phone || t.none}</td>
                <td className="p-4 text-gray-500 max-w-xs truncate">{c.address || t.none}</td>
                <td className="p-4">{c.count}</td>
                <td className="p-4">{formatPrice(c.spent)}</td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-400">{t.noCustomers}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
