import { FC, ReactNode, RefObject, useEffect, useMemo, useState } from 'react';
import './Modal.css'
import clsx from 'clsx';

interface IProps {
  children: ReactNode
  trigger: ReactNode
  wrapperRef: RefObject<HTMLDivElement | null>
  right?: boolean
  onClose?: () => void
  onOpen?: () => void
}

export const Modal: FC<IProps> = (props) => {
  const {
    children,
    trigger,
    wrapperRef,
    right,
    onClose,
    onOpen,
  } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const wrapperClasses = useMemo(() => {
    return clsx('modal__wrapper', isOpen && '_open', right && '_right')
  }, [isOpen, right])

  const handlerOpen = () => {
    setIsOpen(true)
    if (onOpen) onOpen()
  }

  const handlerClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  return (
    <div className='modal'>
      <div className="modal__trigger" onClick={handlerOpen}>
        {trigger}
      </div>

      <div className={wrapperClasses} onClick={handlerClose} ref={wrapperRef}>
        <div className='modal__container' onClick={(event) => event.stopPropagation()}>
          <i className='modal__close fi fi-rr-cross-small' onClick={handlerClose}/>
          {children}
        </div>
      </div>
    </div>
  );
};
