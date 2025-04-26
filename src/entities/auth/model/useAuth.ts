import { useState } from 'react'
import { useNavigate } from 'react-router'

export const useAuth = () => {
  const token = localStorage.getItem('todoist_key')
  const [isAuth, setIsAuth] = useState<boolean>(token ? true : false)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('todoist_key')
    setIsAuth(false)
    navigate('/login')
  }

  return { isAuth, logout }
} 