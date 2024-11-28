// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import bm from './locales/bm.json'; 
import cn from './locales/cn.json'; 

const resources = {
  en: {
    translation: en,
  },
  bm: {
    translation: bm, // Add BM translation here
  },
  cn: {
    translation: cn, // Add BM translation here
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
