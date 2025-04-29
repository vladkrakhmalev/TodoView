import { createBrowserRouter } from "react-router"
import { IRoute } from "./routerTypes"
import { routerConfig as config } from "@shared/config/router"
import { CalendarPageLazy } from "@pages/calendar"
import { LoginPageLazy } from "@pages/login"
import { RedirectLoginPageLazy } from "@pages/redirect-login"
import { NotFoundPageLazy } from "@pages/not-found"
import { MainLayout } from "@app/layouts/main-layout"

const routes: IRoute[] = [
  {
    path: config.login,
    element: <LoginPageLazy/>,
  },
  {
    path: config.redirectLogin,
    element: <RedirectLoginPageLazy/>,
  },
  {
    element: <MainLayout/>,
    children: [
      {
        path: config.calendar,
        element: <CalendarPageLazy/>,
      },
    ]
  },
  {
    path: '*',
    element: <NotFoundPageLazy />,
  }
]

export const router = createBrowserRouter(routes)
