import { FC } from 'react';

import styles from './CartItem.module.css';
import { ICartItem } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const CartItem: FC<ICartItem> = ({ name, id, price, image, count }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(cartActions.addToCart(id));
    console.log(id);
  };
  const removeFromCart = () => {
    dispatch(cartActions.removeFromCart(id));
  };

  const removeAllFromCart = () => {
    dispatch(cartActions.clearCart(id));
  };

  return (
    <div className={styles['item']}>
      <div className={styles['image']} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['currency']}>{price * count} Р</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['minus']} onClick={removeFromCart}>
          <img src="/minus.svg" alt="" />
        </button>
        <div>{count}</div>
        <button className={styles['plus']} onClick={addToCart}>
          +
        </button>
        <button className={styles['remove']} onClick={removeAllFromCart}>
          <img src="/delete-icon.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
