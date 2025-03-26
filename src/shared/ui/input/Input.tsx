import { FC, InputHTMLAttributes, RefObject, useEffect, useState } from 'react';
import './Input.css';
import clsx from 'clsx';
import dayjs from '@shared/config/dayjs';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  label?: string
  inputRef?: RefObject<HTMLInputElement | null>
  onUpdate: (value: string) => void
}

export const Input: FC<IProps> = ({ value, type, label, className, inputRef, onUpdate, ...rest }) => {
  const [inputValue, setInputValue] = useState<string>(value || '')

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
    if (type === 'time' && !value) {
      const time = dayjs().add(1, 'hour').format('HH:00')
      setInputValue(time)
      if (onUpdate) onUpdate(time)
    }
  }, [value, type, onUpdate])

  return (
    <div className={clsx('input', className)}>
      {label &&
        <label className='input__label'>
          {label}
        </label>
      }

      <input
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
