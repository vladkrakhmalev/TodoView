import { FC } from 'react'
import './SidebarMenu.css'
import { sidebarMenu } from '@shared/config/router'
import { NavLink } from 'react-router'
import clsx from 'clsx'

export const SidebarMenu: FC = () => {
  return (
    <div className='sidebar-menu'>
      {sidebarMenu.map(item =>
        item.path ? (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }: { isActive: boolean }) =>
              clsx(`sidebar-menu__link`, isActive && '_active')
            }
          >
            <i className={`fi fi-rr-${item.icon} sidebar-menu__icon`} />
            <span className='sidebar-menu__text'>{item.name}</span>
          </NavLink>
        ) : (
          <div key={item.name} className='sidebar-menu__item'>
            <i className={`fi fi-rr-${item.icon} sidebar-menu__icon`} />
            <span className='sidebar-menu__text'>{item.name}</span>
          </div>
        )
      )}
    </div>
  )
}
