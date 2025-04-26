import { FC, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { useAuth } from "@entities/auth"

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

  return <Outlet/>
}