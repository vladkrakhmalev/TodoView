export const routerConfig = {
  main: '/main',
  calendar: '/calendar',
  settings: '/settings',
  login: '/login',
  redirectLogin: '/redirect-login',
  notFound: '/404',
}

export interface ISidebarMenuItem {
  path: string
  name: string
  icon: string
}

export const sidebarMenu: ISidebarMenuItem[] = [
  {
    path: routerConfig.main,
    name: 'Главная',
    icon: 'home'
  },
  {
    path: routerConfig.calendar,
    name: 'Календарь',
    icon: 'calendar'
  },
  {
    path: routerConfig.settings,
    name: 'Настройки',
    icon: 'settings'
  }
]