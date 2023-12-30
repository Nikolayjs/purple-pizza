import { forwardRef } from 'react';

import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isValid = true, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(styles['input'], className, { [styles['invalid']]: isValid })}
      {...props}
    />
  )
);

export default Input;
