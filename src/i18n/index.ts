import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en.json";
import tn from "./locales/tn.json";

const resources = {
  en: { translation: en },
  ta: { translation: tn },
};

// 🔥 DO NOT make this async
i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: Localization?.locale?.split("-")[0] || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Persist language AFTER init
i18n.on("languageChanged", (lng) => {
  AsyncStorage.setItem("lang", lng);
});

export default i18n;
