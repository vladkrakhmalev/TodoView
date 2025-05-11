import { FC, useEffect } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router'
import './MainLayout.css'
import { useAuth } from '@entities/auth'
import { Sidebar } from '@widgets/sidebar'
import { routerConfig } from '@shared/config/router'
import { useTranslation } from 'react-i18next'

export const MainLayout: FC = () => {
  const { isAuth } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // TODO Отрефакторить то, что связано с авторизацией

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      navigate(`${routerConfig.redirectLogin}?code=${code}`)
    } else if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, searchParams, navigate])

  if (isAuth === null) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {t('Загрузка...')}
      </div>
    )
  }

  return (
    <div className='main-layout'>
      <Sidebar />

      <div className='main-layout__content'>
        <Outlet />
      </div>
    </div>
  )
}
