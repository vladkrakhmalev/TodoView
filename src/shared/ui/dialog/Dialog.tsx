import { FC, ReactNode, useState } from 'react'
import './Dialog.css'
import { useOutsideClick } from '@shared/lib/dom'
import clsx from 'clsx'

interface IProps {
  trigger: ReactNode
  children: ReactNode
  position?: 'center' | 'left' | 'right'
}

export const Dialog: FC<IProps> = props => {
  const { trigger, children, position = 'left' } = props
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOutsideClick(() => setIsOpen(false))

  return (
    <div className='dialog' ref={ref} data-testid='dialog'>
      <button
        className='dialog__trigger'
        data-testid='dialog-trigger'
        onClick={() => setIsOpen(prev => !prev)}
      >
        {trigger}
      </button>

      <div
        className={clsx('dialog__container', isOpen && '_open', '_' + position)}
        data-testid='dialog-container'
      >
        {children}
      </div>
    </div>
  )
}
