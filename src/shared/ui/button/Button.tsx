import { FC, HTMLAttributes, ReactNode } from 'react';
import './Button.css'
import clsx from 'clsx';
import { Spiner } from '../spiner';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  iconBefore?: string
  iconAfter?: string
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
}

export const Button: FC<IProps> = (props) => {
  const {
    children,
    variant = 'secondary',
    iconBefore,
    iconAfter,
    className,
    fullWidth,
    isLoading,
    disabled,
    ...rest
  } = props

  return (
    <button disabled={disabled || isLoading} className={clsx('button', '_' + variant, fullWidth && '_full', className)} {...rest}>
      {iconBefore && <i className={'button__icon fi fi-rr-' + iconBefore}/>}
      {children}
      {iconAfter && <i className={'button__icon fi fi-rr-' + iconAfter}/>}
      {isLoading && <Spiner size={15} contrast={variant === 'primary'}/>}
    </button>
  );
};
