import { FC, useState } from "react"
import './Sidebar.css'
import { useTheme } from '@shared/lib/theme';
import { Button } from "@shared/ui/button";
import { useAuth } from "@entities/auth";
import { NavLink } from "react-router";
import { sidebarMenu } from "@shared/config/router";
import logoSvg from "@shared/assets/icons/logo.svg";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MIN } from "@widgets/sidebar/config/consts";
export const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()

  return (
    <div className="sidebar" style={{width: isOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_MIN}}>
      <div className="sidebar__block">
        <img src={logoSvg} alt="Logo" className="sidebar__logo-img" />
        
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
      </div>

      <div className="sidebar__block">
        <Button 
          iconBefore='sidebar'
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className="sidebar__block">
        <Button 
          iconBefore={theme === 'light' ? 'moon' : 'brightness'} 
          onClick={toggleTheme}
        />

        <Button iconBefore='sign-out-alt' onClick={logout}/>
      </div>
    </div>
  )
}