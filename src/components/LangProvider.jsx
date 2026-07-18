"use client";
import { createContext, useContext, useCallback } from "react";
import { getDict } from "@/lib/i18n";

const LangContext = createContext(null);

export function LangProvider({ lang, children }) {
  const t = getDict(lang);
  const setLang = useCallback((next) => {
    document.cookie = `mily_lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  }, []);

  return (
    <LangContext.Provider value={{ lang, t, dir: t.dir, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) return { lang: "fr", t: getDict("fr"), dir: "ltr", setLang: () => {} };
  return ctx;
}
