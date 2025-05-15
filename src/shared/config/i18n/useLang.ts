import { useTranslation } from 'react-i18next'
import { ILang, ILangOption } from './lang.types'
import { LANGS, LOCAL_STORAGE_LANG_KEY } from './consts'

interface IResult {
  activeLang?: ILangOption
  toggleLang: (value: ILang) => void
}

export const useLang = (): IResult => {
  const { i18n } = useTranslation()
  const activeLang = LANGS.find(lang => lang.value === i18n.language)

  const toggleLang = (value: ILang) => {
    i18n.changeLanguage(value)
    localStorage.setItem(LOCAL_STORAGE_LANG_KEY, value)
  }

  return {
    activeLang,
    toggleLang,
  }
}
