import { FC, useMemo } from 'react';
import './Spiner.css'
import clsx from 'clsx';

interface IProps {
  size?: number
  full?: boolean
  contrast?: boolean
  className?: string
}

export const Spiner: FC<IProps> = ({ size = 30, full, contrast, className }) => {

  const style = useMemo(() => {
    return {width: `${size}px`, height: `${size}px`, borderWidth: `${size / 8}px`}
  }, [size])

  const classes = useMemo(() => {
    return clsx('spiner__icon ', contrast && '_contrast', className)
  }, [contrast, className])

  return (
    <div data-testid="spiner" className={clsx('spiner', full && '_full')}>
      <i
        style={style}
        className={classes}
      />
    </div>
  );
};
