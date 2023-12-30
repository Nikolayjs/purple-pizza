import { ChangeEvent, FC, useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../components/interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

const Menu: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string | undefined>('');

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
        params: {
          name,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.message === 'Request failed with status code 404') {
          setError('Реквест фалед месаге');
        }
      }
      setIsLoading(false);
      return;
    }
  };
  return (
    <>
      <div className={styles['head']}>
        <Heading>Меню</Heading>
        <Search placeholder="Введите блюдо или состав" onChange={updateFilter} />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <>Загрузкоу</>}
        {!isLoading && products.length === 0 && <div>Ничего не найдено</div>}
      </div>
    </>
  );
};

export default Menu;
