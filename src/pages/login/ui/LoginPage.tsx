import { FC } from 'react';
import './LoginPage.css';
import { Button } from '@shared/ui/button';
import { getAuthorizationUrl } from '@shared/config/todoist';
import logoIcon from '@shared/assets/icons/logo.svg'

const LoginPage: FC = () => {
  const handleLoginWithTodoist = () => {
    window.location.href = getAuthorizationUrl()
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logoIcon} alt="TodoView" className="login-logo" />
        <h1 className="login-title">Добро пожаловать в TodoView</h1>
        <p className="login-description">
          Для использования приложения необходимо войти через ваш аккаунт Todoist
        </p>
        
        <Button 
          variant='danger'
          fullWidth
          onClick={handleLoginWithTodoist}
        >
          Войти через Todoist
        </Button>
      </div>
    </div>
  )
}

export default LoginPage