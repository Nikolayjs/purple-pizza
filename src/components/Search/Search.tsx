import { forwardRef } from 'react';

import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ isValid = true, className, ...props }, ref) => {
    return (
      <div className={styles['input-wrapper']}>
        <input
          ref={ref}
          className={cn(styles['input'], className, {
            [styles['invalid']]: isValid,
          })}
          {...props}
        />
        <img className={styles['icon']} src="/search.svg" alt="Iconka zalupi" />
      </div>
    );
  }
);

export default Search;
