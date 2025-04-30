import { FC, ReactNode, useMemo } from 'react';
import './Modal.css'
import clsx from 'clsx';

interface IProps {
  isOpen: boolean
  children: ReactNode
  position?: 'center' | 'left' | 'right'
  onClose?: () => void
}

export const Modal: FC<IProps> = ({ children, isOpen, position = 'center', onClose }) => {

  const classes = useMemo(() => {
    return clsx('modal _open', '_' + position)
  }, [position])

  if (!isOpen) return null

  return (
    <div role="dialog" className={classes} onClick={() => onClose && onClose()}>
      <div data-testid="modal-container" className='modal__container' onClick={(event) => event.stopPropagation()}>
        <i data-testid="modal-close" className='modal__close fi fi-rr-cross-small' onClick={onClose}/>
        {children}
      </div>
    </div>
  )
}