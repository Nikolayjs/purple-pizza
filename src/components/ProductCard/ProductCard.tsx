import { FC, MouseEvent, useState } from 'react';

import styles from './ProductCard.module.css';
import { IProductCard } from './ProductCard.props';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cartSlice';

const ProductCard: FC<IProductCard> = (props) => {
  const [currentlyInCart, setCurrentlyInCart] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    if (currentlyInCart) {
      dispatch(cartActions.removeFromCart(props.id));
      setCurrentlyInCart(false);
    } else {
      dispatch(cartActions.addToCart(props.id));
      setCurrentlyInCart(true);
    }
  };

  return (
    <Link to={`/product/${props.id}`} className={styles['link']}>
      <div className={styles['card']}>
        <div className={styles['head']} style={{ backgroundImage: `url(${props.image})` }}>
          <div className={styles['price']}>
            {props.price} <span className={styles['currency']}>Р</span>
          </div>
          <button className={styles['add-to-cart']} onClick={addToCart}>
            <img src="/cart-button.svg" alt="" />
          </button>
          <div className={styles['rating']}>
            {props.rating} <img src="/star.svg" alt="" />
          </div>
        </div>
        <div className={styles['footer']}>
          <div className={styles['title']}>{props.name}</div>
          <div className={styles['description']}>{props.ingredients.join(', ')}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
