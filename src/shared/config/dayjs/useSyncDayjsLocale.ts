import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { DEFAULT_LANG } from '../i18n'

export const useSyncDayjsLocale = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    dayjs.locale(i18n.language || DEFAULT_LANG.value)
  }, [i18n.language])
}
