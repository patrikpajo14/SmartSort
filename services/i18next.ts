// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
import en from "../locales/en.json";
import hr from "../locales/hr.json";

// export const langResources = {
//   en: {
//     translation: en,
//   },
//   hr: {
//     translation: hr,
//   },
// };

export const langResources = {
  en: {
    translation: en,
  },
  hr: {
    translation: hr,
  },
};

/*
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: langResources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
*/
