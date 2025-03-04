import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    ns: ["translations"],
    defaultNS: "translations",

    detection: {
      caches: ["localStorage"],
      order: ["localStorage", "navigator"],
    },

    backend: {
      // 相対パスを使用
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },

    react: {
      useSuspense: false, // Suspenseを無効化して問題を回避
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
