import { FC } from 'react';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { IMenuListProps } from './MenuList.props';

import styles from './MenuList.module.css';

const MenuList: FC<IMenuListProps> = ({ products }) => {
  return (
    <div className={styles['wrapper']}>
      {products.map((p) => (
        <ProductCard
          id={p.id}
          key={p.id}
          name={p.name}
          ingredients={p.ingredients}
          rating={p.rating}
          price={p.price}
          image={p.image}
        />
      ))}
    </div>
  );
};

export default MenuList;
