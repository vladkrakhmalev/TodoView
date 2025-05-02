import { FC, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import "./MainLayout.css"
import { useAuth } from "@entities/auth"
import { Sidebar } from "@widgets/sidebar"

export const MainLayout: FC = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth, navigate])

  if (isAuth === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Загрузка...
      </div>
    )
  }

  return (
    <div className="main-layout">
      <Sidebar/>

      <div className="main-layout__content">
        <Outlet/>
      </div>
    </div>
  )
}