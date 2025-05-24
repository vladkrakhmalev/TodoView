import { FC } from 'react'
import './SidebarMenu.css'
import { useSidebarMenu } from '../../model/useSidebarMenu'
import { NavLink } from 'react-router'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export const SidebarMenu: FC = () => {
  const { t } = useTranslation()
  const sidebarMenu = useSidebarMenu()

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
            <span className='sidebar-menu__text-label'>{t('Скоро')}</span>
          </div>
        )
      )}
    </div>
  )
}
