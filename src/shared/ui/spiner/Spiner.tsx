import { FC } from 'react'
import './Spiner.css'
import clsx from 'clsx'

interface IProps {
  size?: number
  full?: boolean
  contrast?: boolean
  className?: string
}

export const Spiner: FC<IProps> = props => {
  const { size = 30, full, contrast, className } = props

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${size / 8}px`,
  }

  const classes = clsx('spiner__icon ', contrast && '_contrast', className)

  return (
    <div data-testid='spiner' className={clsx('spiner', full && '_full')}>
      <i style={style} className={classes} />
    </div>
  )
}
