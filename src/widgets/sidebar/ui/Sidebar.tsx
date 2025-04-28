import { FC, useState } from "react"
import './Sidebar.css'
import { useTheme } from '@shared/lib/theme';
import { Modal } from '@shared/ui/modal';
import { Button } from "@shared/ui/button";
import { useAuth } from "@entities/auth";
import { NavLink } from "react-router";
import { sidebarMenu } from "@shared/config/router/config";
import logoSvg from "@shared/assets/icons/logo.svg";

export const Sidebar: FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button iconBefore='sidebar' onClick={() => setIsOpen(true)}/>

      <Modal isOpen={isOpen} position='left' onClose={() => setIsOpen(false)}>
        <div className="sidebar">
          <div className="sidebar__content">
            <img src={logoSvg} alt="Logo" className="sidebar__logo-img" />
            
            <nav className="sidebar__menu">
              {sidebarMenu.map((item) => (
                <NavLink 
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) => 
                    `sidebar__menu-item ${isActive ? 'sidebar__menu-item--active' : ''}`
                  }
                >
                  <i className={`fi fi-rr-${item.icon} sidebar__menu-icon`} />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="sidebar__footer">
            <Button 
              iconBefore={theme === 'light' ? 'moon' : 'brightness'} 
              onClick={toggleTheme}
            />
            <Button iconBefore='sign-out-alt' onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}