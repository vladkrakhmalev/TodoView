import { FC, useState } from "react"
import './Sidebar.css'
import { useTheme } from '@shared/lib/theme';
import { Button } from "@shared/ui/button";
import { useAuth } from "@entities/auth";
import logoSvg from "@shared/assets/icons/logo.svg";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MIN } from "@widgets/sidebar/config/consts";
import { SidebarMenu } from "../sidebar-menu/SidebarMenu";
import { ProjectSmallList } from "@entities/project";

const isOpenSidebar = localStorage.getItem('isOpenSidebar') === 'true'

export const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(isOpenSidebar)
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()

  const toggleSidebar = () => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)
    localStorage.setItem('isOpenSidebar', newIsOpen.toString())
  }

  return (
    <div className="sidebar" style={{width: isOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_MIN}}>
      <div className="sidebar__block">
        <Button 
          iconBefore={isOpen ? 'angle-left' : 'angle-right'}
          variant="transparent"
          className="sidebar__toggle"
          onClick={toggleSidebar}
        />

        <img src={logoSvg} alt="Logo" className="sidebar__logo-img" />
        
        <SidebarMenu />
        <ProjectSmallList />
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