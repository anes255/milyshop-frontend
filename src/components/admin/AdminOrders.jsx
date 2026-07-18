"use client";
import { Fragment, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useLang } from "@/components/LangProvider";
import { getAdminDict } from "@/lib/admin-i18n";
import { apiFetch } from "@/lib/api";

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
const COLOR = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminOrders({ initial }) {
  const { lang } = useLang();
  const t = getAdminDict(lang);
  const [orders, setOrders] = useState(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(null);

  const changeStatus = async (id, status) => {
    const res = await apiFetch(`/api/admin/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
    if (res.ok) setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  const filtered = orders.filter((o) => {
    const matchQ = !q || o.fullName.toLowerCase().includes(q.toLowerCase()) || o.phone.includes(q) || o.id.includes(q);
    const matchF = !filter || o.status === filter;
    return matchQ && matchF;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">{t.orders} ({orders.length})</h1>
        <div className="flex gap-3 flex-wrap">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} className="border border-beige-dark px-3 py-2 text-sm outline-none focus:border-gold rounded-full" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-beige-dark px-3 py-2 text-sm bg-white rounded-full">
            <option value="">{t.allStatuses}</option>
            {STATUSES.map((s) => <option key={s} value={s}>{t[s]}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-beige-dark overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead className="bg-beige/50 text-gray-500">
            <tr>
              <th className="text-start p-4">#</th>
              <th className="text-start p-4">{t.client}</th>
              <th className="text-start p-4">{t.phone}</th>
              <th className="text-start p-4">{t.total}</th>
              <th className="text-start p-4">{t.status}</th>
              <th className="text-start p-4">{t.date}</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <Fragment key={o.id}>
                <tr className="border-t border-beige-dark">
                  <td className="p-4 font-mono text-xs">{o.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 font-medium">{o.fullName}</td>
                  <td className="p-4 text-gray-500">{o.phone}</td>
                  <td className="p-4">{formatPrice(o.total)}</td>
                  <td className="p-4">
                    <select value={o.status} onChange={(e) => changeStatus(o.id, e.target.value)} className={`text-xs px-2 py-1 rounded border-0 ${COLOR[o.status]}`}>
                      {STATUSES.map((s) => <option key={s} value={s}>{t[s]}</option>)}
                    </select>
                  </td>
                  <td className="p-4 text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="p-4"><button onClick={() => setOpen(open === o.id ? null : o.id)} className="text-gold hover:underline">{t.details}</button></td>
                </tr>
                {open === o.id && (
                  <tr className="bg-beige/30"><td colSpan={7} className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t.delivery}</p>
                        <p>{o.address}</p>
                        {o.notes && <p className="text-gray-500 mt-1">{o.notes}</p>}
                        <p className="text-gray-500 mt-1">{t.payment}: {o.paymentMethod}</p>
                        {o.couponCode && <p className="text-gold">{t.coupon}: {o.couponCode} (-{formatPrice(o.discount)})</p>}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t.items}</p>
                        {o.items.map((i) => (
                          <div key={i.id} className="flex justify-between">
                            <span>{i.name} {i.size ? `(${i.size})` : ""} ×{i.quantity}</span>
                            <span>{formatPrice(i.price * i.quantity)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-beige-dark">
                          <span>{t.total}</span><span>{formatPrice(o.total)}</span>
                        </div>
                      </div>
                    </div>
                  </td></tr>
                )}
              </Fragment>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-gray-400">{t.noOrders}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
