import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { en } from "./en";
import { es } from "./es";

export type Lang = "en" | "es";
export type Copy = typeof en;

const copies: Record<Lang, Copy> = { en, es };
const STORAGE_KEY = "lang";

// Remembered choice first, then the browser's language, then English.
function initialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    // Storage can be blocked; the page still works without it.
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "en",
  setLang: () => undefined,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = copies[lang].ui.pageTitle;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not saved; the choice still holds for this visit.
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
export const useCopy = () => copies[useLang().lang];
