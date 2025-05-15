import { FC, useState } from 'react'
import './Switcher.css'
import clsx from 'clsx'

interface IOption {
  value: string
  title: string
}

interface IProps {
  defaultValue?: string
  options: IOption[]
  disabled?: boolean
  onChange: (option: IOption) => void
}

export const Switcher: FC<IProps> = ({
  defaultValue = null,
  options,
  disabled = false,
  onChange,
}) => {
  const [activeValue, setActiveValue] = useState<string | null>(defaultValue)

  const handlerChange = (option: IOption) => {
    if (disabled) return

    setActiveValue(option.value)
    onChange(option)
  }

  return (
    <div
      data-testid='switcher'
      className={clsx('switcher', disabled && '_disabled')}
    >
      {options.map((option, idx) => (
        <button
          key={idx}
          type='button'
          className={clsx(
            'switcher__item',
            activeValue === option.value && '_active'
          )}
          onClick={() => handlerChange(option)}
        >
          <span className='switcher__item-title'>{option.title}</span>
        </button>
      ))}
    </div>
  )
}
