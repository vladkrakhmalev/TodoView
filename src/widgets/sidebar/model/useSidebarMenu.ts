import { routerConfig } from '@shared/config/router'
import { useTranslation } from 'react-i18next'
import { ISidebarMenuItem } from './sidebar.types'

export const useSidebarMenu = () => {
  const { t } = useTranslation()

  const sidebarMenu: ISidebarMenuItem[] = [
    {
      name: t('Главная'),
      icon: 'home',
    },
    {
      path: routerConfig.today,
      name: t('Сегодня'),
      icon: 'calendar-day',
    },
    {
      path: routerConfig.calendar,
      name: t('Календарь'),
      icon: 'calendar',
    },
  ]

  return sidebarMenu
}
