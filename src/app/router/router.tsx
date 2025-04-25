import { createBrowserRouter } from "react-router"
import { IRoute } from "./routerTypes"
import { routerConfig as config } from "./routerConfig"
import { CalendarPageLazy } from "@pages/calendar"

const routes: IRoute[] = [
  {
    path: config.calendar,
    element: <CalendarPageLazy/>,
  },
]

export const router = createBrowserRouter(routes)
