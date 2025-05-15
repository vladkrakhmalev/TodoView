import { FC, MouseEvent, ReactNode } from 'react'
import './Modal.css'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

interface IProps {
  isOpen: boolean
  children: ReactNode
  title?: string
  position?: 'center' | 'left' | 'right'
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Modal: FC<IProps> = props => {
  const { children, isOpen, title, position = 'center', onClose } = props

  if (!isOpen) return null

  return createPortal(
    <button
      data-testid='modal'
      className={clsx('modal _open', '_' + position)}
      onClick={event => onClose?.(event)}
    >
      <button
        data-testid='modal-container'
        className='modal__container'
        onClick={event => event.stopPropagation()}
      >
        <button
          data-testid='modal-close'
          className='modal__close'
          onClick={event => onClose?.(event)}
        >
          <i className='fi fi-rr-cross-small' />
        </button>
        {title && (
          <h3 data-testid='modal-title' className='modal__title'>
            {title}
          </h3>
        )}
        {children}
      </button>
    </button>,
    document.getElementById('app') || document.body
  )
}
