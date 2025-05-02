export const routerConfig = {
  main: '/main',
  today: '/today',
  calendar: '/calendar',
  projects: '/projects',
  project: '/projects/:id',
  login: '/login',
  redirectLogin: '/redirect-login',
  notFound: '/404',
}

export interface ISidebarMenuItem {
  path?: string
  name: string
  icon: string
}

export const sidebarMenu: ISidebarMenuItem[] = [
  {
    name: 'Главная',
    icon: 'home'
  },
  {
    path: routerConfig.today,
    name: 'Сегодня',
    icon: 'calendar-day'
  },
  {
    path: routerConfig.calendar,
    name: 'Календарь',
    icon: 'calendar'
  },
]