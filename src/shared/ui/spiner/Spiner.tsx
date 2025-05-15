import { FC } from 'react'
import './Spiner.css'
import clsx from 'clsx'

interface IProps {
  size?: number
  full?: boolean
  fullScreen?: boolean
  contrast?: boolean
  className?: string
}

export const Spiner: FC<IProps> = props => {
  const { size = 30, full, fullScreen, contrast, className } = props

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${size / 8}px`,
  }

  const classesSpiner = clsx(
    'spiner',
    full && '_full',
    fullScreen && '_full-screen'
  )

  const classesIcon = clsx('spiner__icon ', contrast && '_contrast', className)

  return (
    <div data-testid='spiner' className={classesSpiner}>
      <i style={style} className={classesIcon} />
    </div>
  )
}
