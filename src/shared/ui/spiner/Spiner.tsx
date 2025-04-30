import { FC, useMemo } from 'react';
import './Spiner.css'
import clsx from 'clsx';

interface IProps {
  size?: number
  contrast?: boolean
  className?: string
}

export const Spiner: FC<IProps> = ({ size = 30, contrast, className }) => {

  const style = useMemo(() => {
    return {width: `${size}px`, height: `${size}px`, borderWidth: `${size / 8}px`}
  }, [size])

  return (
    <i role="status" data-testid="spinner" className={clsx('spiner', contrast && '_contrast', className)} style={style} />
  );
};
