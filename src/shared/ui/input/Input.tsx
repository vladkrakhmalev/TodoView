import { FC, InputHTMLAttributes, RefObject, useEffect, useState } from 'react';
import './Input.css';
import clsx from 'clsx';
import dayjs from '@shared/config/dayjs';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number
  label?: string
  inputRef?: RefObject<HTMLInputElement | null>
  onUpdate: (value: string) => void
}

export const Input: FC<IProps> = ({ value, type, label, className, inputRef, onUpdate, ...rest }) => {
  const [inputValue, setInputValue] = useState<string | number>(value || '')
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (onUpdate) onUpdate(e.target.value)
  }

  useEffect(() => {
    if (type === 'date' && !value) {
      const today = dayjs().format('YYYY-MM-DD')
      setInputValue(today)
      if (onUpdate) onUpdate(today)
    }
  }, [value, type, onUpdate])

  return (
    <div className={clsx('input', className)}>
      {label &&
        <label htmlFor={inputId} className='input__label'>
          {label}
        </label>
      }

      <input
        id={inputId}
        data-testid="input"
        ref={inputRef}
        className='input__component'
        value={value ?? inputValue}
        type={type}
        onChange={handlerChange}
        {...rest}
        />
    </div>
  );
};
