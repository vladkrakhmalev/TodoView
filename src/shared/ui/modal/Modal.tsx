import { FC, MouseEvent, ReactNode } from 'react'
import './Modal.css'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

interface IProps {
  isOpen: boolean
  children: ReactNode
  position?: 'center' | 'left' | 'right'
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Modal: FC<IProps> = props => {
  const { children, isOpen, position = 'center', onClose } = props

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
        <button onClick={event => onClose?.(event)}>
          <i
            data-testid='modal-close'
            className='modal__close fi fi-rr-cross-small'
          />
        </button>
        {children}
      </button>
    </button>,
    document.getElementById('app') as HTMLElement
  )
}
