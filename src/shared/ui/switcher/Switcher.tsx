import { FC, useState } from 'react';
import './Switcher.css'
import clsx from 'clsx';

interface IOption {
  value: string
  title: string
}

interface IProps {
  defaultValue?: string
  options: IOption[]
  onChange: (option: IOption) => void
}

export const Switcher: FC<IProps> = ({ defaultValue = null, options, onChange }) => {
  const [activeValue, setActiveValue] = useState<string | null>(defaultValue)

  const handlerChange = (option: IOption) => {
    setActiveValue(option.value)
    onChange(option)
  }

  return (
    <div className='switcher'>
      {options.map((option, idx) =>
        <div
          key={idx}
          className={clsx('switcher__item', activeValue === option.value && '_active')}
          onClick={() => handlerChange(option)}
        >
          {option.title}
        </div>
      )}
    </div>
  );
};
