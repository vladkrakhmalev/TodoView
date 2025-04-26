import { createBrowserRouter } from "react-router"
import { IRoute } from "./routerTypes"
import { routerConfig as config } from "./routerConfig"
import { CalendarPageLazy } from "@pages/calendar"
import { LoginPageLazy } from "@pages/login"
import { RedirectLoginPageLazy } from "@pages/redirect-login"
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
]

export const router = createBrowserRouter(routes)
