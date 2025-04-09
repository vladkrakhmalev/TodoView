import { FC, ReactNode, useMemo } from 'react';
import './Modal.css'
import clsx from 'clsx';

interface IProps {
  isOpen: boolean
  children: ReactNode
  right?: boolean
  onClose: () => void
}

export const Modal: FC<IProps> = ({ children, isOpen, right, onClose }) => {
  const classes = useMemo(() => {
    return clsx('modal', isOpen && '_open', right && '_right')
  }, [isOpen, right])

  return (
    <div className={classes} onClick={onClose}>
      <div className='modal__container' onClick={(event) => event.stopPropagation()}>
        <i className='modal__close fi fi-rr-cross-small' onClick={onClose}/>
        {children}
      </div>
    </div>
  )
}