import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files directly
import enTranslation from "./public/locales/en/common.json";
import viTranslation from "./public/locales/vi/common.json";

// Don't initialize i18n if it's already initialized
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    // Remove Backend and LanguageDetector for server-side rendering
    .init({
      resources: {
        en: {
          common: enTranslation,
        },
        vi: {
          common: viTranslation,
        },
      },
      lng:
        typeof window !== "undefined"
          ? window.localStorage.getItem("i18nextLng") || "vi"
          : "vi", // Check localStorage if available, fallback to vi
      fallbackLng: "vi",
      ns: ["common"],
      defaultNS: "common",
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
