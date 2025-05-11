import { LANGS } from './consts'

export type ILang = (typeof LANGS)[number]['value']
export type ILangOption = (typeof LANGS)[number]
