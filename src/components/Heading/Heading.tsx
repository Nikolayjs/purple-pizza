import { FC } from 'react';

import styles from './Heading.module.css';
import { HeadingProps } from './Heading.props';
import cn from 'classnames';

const Heading: FC<HeadingProps> = ({ children, className, ...props }) => {
  return (
    <h1 className={cn(className, styles['h1'])} {...props}>
      {children}
    </h1>
  );
};

export default Heading;
