import { useState } from 'react'
import { useNavigate } from 'react-router'

export const useAuth = () => {
  const token = localStorage.getItem('accessToken')
  const [isAuth, setIsAuth] = useState<boolean>(token ? true : false)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('todoistKey')
    setIsAuth(false)
    navigate('/login')
  }

  return { isAuth, logout }
}
