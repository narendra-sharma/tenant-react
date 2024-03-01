import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './langs/en';
import es from './langs/es';
i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'en',
    react: {
        wait: true,
    },
    resources: {
        en: { ...en },
        es: { ...es }
    }
})

export default i18n;