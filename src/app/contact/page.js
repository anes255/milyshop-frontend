"use client";
import { useState } from "react";
import { useLang } from "@/components/LangProvider";

export default function ContactPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="container-mily py-14">
      <h1 className="text-4xl font-semibold text-center mb-3">{t.contactUs}</h1>
      <div className="grid md:grid-cols-2 gap-12 mt-10 max-w-4xl mx-auto">
        <div className="space-y-6">
          <p className="text-gray-500">{t.newsletterText}</p>
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-3">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold shrink-0"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              contact@milyshop.com
            </p>
            <p className="flex items-center gap-3">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold shrink-0"><path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z"/></svg>
              +213 555 000 000
            </p>
            <p className="flex items-center gap-3">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gold shrink-0"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
              Alger, Algérie
            </p>
          </div>
        </div>
        <div>
          {sent ? (
            <p className="text-gold font-medium bg-beige rounded-xl p-4">{t.messageSent}</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <input required placeholder={t.fullName} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              <input required type="email" placeholder={t.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
              <textarea required rows={5} placeholder={t.message} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" />
              <button className="btn-gold w-full">{t.send}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
