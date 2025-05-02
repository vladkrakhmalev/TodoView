import { FC, MouseEvent, ReactNode, useMemo } from 'react';
import './Modal.css'
import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface IProps {
  isOpen: boolean
  children: ReactNode
  position?: 'center' | 'left' | 'right'
  onClose?: (event: MouseEvent<HTMLDivElement>) => void
}

export const Modal: FC<IProps> = ({ children, isOpen, position = 'center', onClose }) => {

  const classes = useMemo(() => {
    return clsx('modal _open', '_' + position)
  }, [position])

  if (!isOpen) return null

  return createPortal(
    <div data-testid="modal" className={classes} onClick={(event) => onClose && onClose(event)}>
      <div data-testid="modal-container" className='modal__container' onClick={(event) => event.stopPropagation()}>
        <i data-testid="modal-close" className='modal__close fi fi-rr-cross-small' onClick={onClose}/>
        {children}
      </div>
    </div>,
    document.getElementById('app') as HTMLElement
  )
}