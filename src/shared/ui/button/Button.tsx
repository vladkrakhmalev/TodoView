import { FC, HTMLAttributes, ReactNode } from 'react'
import './Button.css'
import clsx from 'clsx'
import { Spiner } from '../spiner'

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'transparent'
  size?: 'small' | 'medium' | 'big'
  iconBefore?: string
  iconAfter?: string
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
}

export const Button: FC<IProps> = props => {
  const {
    children,
    variant = 'secondary',
    size = 'medium',
    iconBefore,
    iconAfter,
    className,
    fullWidth,
    isLoading,
    disabled,
    ...rest
  } = props

  const classes = clsx(
    'button',
    '_' + variant,
    fullWidth && '_full',
    size && '_' + size,
    className
  )

  return (
    <button
      data-testid='button'
      disabled={disabled || isLoading}
      className={classes}
      {...rest}
    >
      {iconBefore && (
        <i
          data-testid='icon-before'
          className={'button__icon fi fi-rr-' + iconBefore}
        />
      )}
      {children}
      {iconAfter && (
        <i
          data-testid='icon-after'
          className={'button__icon fi fi-rr-' + iconAfter}
        />
      )}
      {isLoading && <Spiner size={15} contrast={variant === 'primary'} />}
    </button>
  )
}
