"use client";
import { useState } from "react";
import { useLang } from "./LangProvider";

export default function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="bg-beige py-16">
      <div className="container-mily max-w-2xl text-center">
        <h2 className="section-title">{t.newsletter}</h2>
        <p className="text-gray-500 mt-3">{t.newsletterText}</p>
        {done ? (
          <p className="mt-6 text-gold font-medium bg-white rounded-xl py-4 px-6 inline-block shadow-sm">{t.messageSent}</p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.yourEmail}
              className="input flex-1"
            />
            <button className="btn-gold whitespace-nowrap">{t.subscribe}</button>
          </form>
        )}
      </div>
    </section>
  );
}
