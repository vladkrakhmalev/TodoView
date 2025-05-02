import { FC, ReactNode, useState } from "react"
import './Dialog.css'
import { useOutsideClick } from "@shared/lib/dom"
import clsx from "clsx"

interface IProps {
  trigger: ReactNode
  children: ReactNode
}

export const Dialog: FC<IProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)  

  const ref = useOutsideClick(() => setIsOpen(false))
  
  return (
    <div
      className="dialog"
      ref={ref}
      data-testid="dialog"
    >
      <div
        className="dialog__trigger"
        data-testid="dialog-trigger"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {trigger}
      </div>

      <div
        className={clsx("dialog__container", isOpen && "_open")}
        data-testid="dialog-container"
      >
        {children}
      </div>
    </div>
  )
}