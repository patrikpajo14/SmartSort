import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import hr from "../locales/hr.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const langResources = {
  en: {
    translation: en,
  },
  hr: {
    translation: hr,
  },
};

const initI18n = async () => {
  // Try to get the stored language preference
  let storedLang = "hr"; // Default fallback
  try {
    const storedData = await AsyncStorage.getItem("globalStore");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.state && parsedData.state.lang) {
        storedLang = parsedData.state.lang;
      }
    }
  } catch (error) {
    console.error("Error retrieving language from storage:", error);
  }
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources: langResources,
    lng: storedLang, // Default language
    fallbackLng: "hr",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });
};
initI18n();

export default i18n;
