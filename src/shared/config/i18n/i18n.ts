import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import { DEFAULT_LANG, LOCAL_STORAGE_LANG_KEY } from './consts'

const savedLang =
  localStorage.getItem(LOCAL_STORAGE_LANG_KEY) ||
  import.meta.env.VITE_LANG ||
  DEFAULT_LANG.value

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: savedLang,
    fallbackLng: false,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })

export default i18n
