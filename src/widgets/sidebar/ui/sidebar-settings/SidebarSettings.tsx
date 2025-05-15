import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@entities/auth'
import { ChangeLang } from '@features/switch-lang'
import { useTheme } from '@shared/lib/theme'
import { Button } from '@shared/ui/button'
import { Modal } from '@shared/ui/modal'
import './SidebarSettings.css'

export const SidebarSettings = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()

  const iconTheme = theme === 'light' ? 'moon' : 'brightness'

  return (
    <>
      <Button iconBefore='user' onClick={() => setIsOpen(true)} />

      <Modal
        isOpen={isOpen}
        title={t('Настройки')}
        onClose={() => setIsOpen(false)}
      >
        <div className='sidebar-settings'>
          <ChangeLang />
          <Button iconBefore={iconTheme} onClick={toggleTheme}>
            {t('Сменить тему')}
          </Button>
          <Button iconBefore='sign-out-alt' onClick={logout}>
            {t('Выйти')}
          </Button>
        </div>
      </Modal>
    </>
  )
}
