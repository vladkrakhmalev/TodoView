import { createBrowserRouter } from 'react-router'
import { IRoute } from './routerTypes'
import { routerConfig as config } from '@shared/config/router'
import { MainLayout } from '@app/layouts/main-layout'
import { CalendarPageLazy } from '@pages/calendar'
import { LoginPageLazy } from '@pages/login'
import { RedirectLoginPageLazy } from '@pages/redirect-login'
import { NotFoundPageLazy } from '@pages/not-found'
import { TodayPageLazy } from '@pages/today'
import { ProjectPageLazy } from '@pages/project'
import { ProjectsPageLazy } from '@pages/projects'
import { HomePageLazy } from '@pages/home'

const routes: IRoute[] = [
  {
    path: config.login,
    element: <LoginPageLazy />,
  },
  {
    path: config.redirectLogin,
    element: <RedirectLoginPageLazy />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: config.home,
        element: <HomePageLazy />,
      },
      {
        path: config.today,
        element: <TodayPageLazy />,
      },
      {
        path: config.calendar,
        element: <CalendarPageLazy />,
      },
      {
        path: config.projects,
        element: <ProjectsPageLazy />,
      },
      {
        path: config.project,
        element: <ProjectPageLazy />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPageLazy />,
  },
]

export const router = createBrowserRouter(routes)
