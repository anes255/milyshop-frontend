import { cookies } from "next/headers";
import { DEFAULT_LANG, LANGS, getDict } from "./i18n";

export function getServerLang() {
  const c = cookies().get("mily_lang")?.value;
  return LANGS.includes(c) ? c : DEFAULT_LANG;
}

export function getServerDict() {
  const lang = getServerLang();
  return { lang, t: getDict(lang), dir: getDict(lang).dir };
}
