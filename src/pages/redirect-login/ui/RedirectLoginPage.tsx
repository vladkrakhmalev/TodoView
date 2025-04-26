import { FC } from 'react'
import './RedirectLoginPage.css'
import { useProcessOAuth } from '@entities/auth'

const RedirectLoginPage: FC = () => {
  const { status, error } = useProcessOAuth()

  return (
    <div className="redirect-login-page">
      <div className="redirect-login-container">
        {status === 'loading' && (
          <>
            <div className="redirect-loading-spinner"></div>
            <h1 className="redirect-status-text">Обработка авторизации</h1>
            <p className="redirect-status-message">Пожалуйста, подождите...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <i className="redirect-status-icon success fi fi-rr-check-circle"></i>
            <h1 className="redirect-status-text">Авторизация успешна!</h1>
            <p className="redirect-status-message">Перенаправление в приложение...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <i className="redirect-status-icon error fi fi-rr-cross-circle"></i>
            <h1 className="redirect-status-text">Ошибка авторизации</h1>
            <p className="redirect-status-message">{error}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default RedirectLoginPage
