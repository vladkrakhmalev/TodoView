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

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClose?.(event)
  }

  if (!isOpen) return null

  return createPortal(
    <button
      data-testid='modal'
      className={clsx('modal _open', '_' + position)}
      onClick={event => onClose && onClose(event)}
    >
      <button
        data-testid='modal-container'
        className='modal__container'
        onClick={handleOpen}
      >
        <i
          data-testid='modal-close'
          className='modal__close fi fi-rr-cross-small'
        />
        {children}
      </button>
    </button>,
    document.getElementById('app') as HTMLElement
  )
}
