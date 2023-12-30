import { FC, Suspense } from 'react';

// import styles from './Product.module.css';
import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../interfaces/product.interface';

const Product: FC = () => {
  const data = useLoaderData() as { data: IProduct };
  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={data.data}>
        {({ data }: { data: IProduct }) => <>Product - {data.name}</>}
      </Await>
    </Suspense>
  );
};

export default Product;
