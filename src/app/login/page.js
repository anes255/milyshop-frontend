"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { getAdminDict } from "@/lib/admin-i18n";
import { apiFetch, setToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const { lang } = useLang();
  const t = getAdminDict(lang);
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const res = await apiFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setToken(data.token);
      router.push("/admin");
    } catch (e) { setErr(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="container-mily py-20 max-w-sm">
      <div className="text-center mb-8">
        <p className="text-gold tracking-[0.3em] text-xs mb-2">MILY SHOP</p>
        <h1 className="text-3xl font-semibold">{t.adminSpace}</h1>
        <p className="text-sm text-gray-400 mt-2">{t.adminSpaceSub}</p>
      </div>
      <form onSubmit={submit} className="space-y-4 bg-white border border-beige-dark rounded-2xl p-6 shadow-sm">
        <div>
          <label className="label">{t.username}</label>
          <input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input" autoComplete="username" />
        </div>
        <div>
          <label className="label">{t.password}</label>
          <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" autoComplete="current-password" />
        </div>
        {err && <p className="text-rose-dark text-sm">{err}</p>}
        <button disabled={loading} className="btn-gold w-full disabled:opacity-50">{loading ? "..." : t.signIn}</button>
      </form>
    </div>
  );
}
