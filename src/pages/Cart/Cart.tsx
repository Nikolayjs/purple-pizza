import { FC, useCallback, useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { IProduct } from '../../components/interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const DELIVERY_PRICE = 300;
const Cart: FC = () => {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const token = useSelector((state: RootState) => state.user.token);
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const totalPrice = items
    .map((item) => {
      const product = cartProducts.find((p) => p.id === item.id);
      if (!product) {
        return;
      }
      return product.price * item.count;
    })
    .reduce((a = 1, b = 0) => a + b, 0);

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('asd');

    navigate('/success');
  };

  const getItem = useCallback(async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  }, []);

  const loadAllItems = useCallback(async () => {
    const res = await Promise.all(items.map((item) => getItem(item.id)));
    setCartProducts(res);
  }, [items, getItem, setCartProducts]);

  useEffect(() => {
    loadAllItems();
  }, [items, loadAllItems]);

  return (
    <>
      <Heading className={styles['heading']}>Корзина</Heading>
      {items.map((item) => {
        const product = cartProducts.find((p) => p.id === item.id);
        if (!product) {
          return;
        }
        return (
          <CartItem
            key={product.id}
            count={item.count}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        );
      })}
      <div className={styles['line']}>
        <div className={styles['text']}>Итог</div>
        <div className={styles['price']}>
          {totalPrice}
          <span>Р</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>Доставка</div>
        <div className={styles['price']}>
          {DELIVERY_PRICE}
          <span>Р</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>
          Итог <span className={styles['count']}>({items.length})</span>
        </div>
        <div className={styles['price']}>
          {totalPrice && totalPrice + DELIVERY_PRICE}
          <span>Р</span>
        </div>
      </div>
      <div className={styles['checkout']}>
        <Button appearance="big" onClick={checkout}>
          оформить
        </Button>
      </div>
    </>
  );
};

export default Cart;
