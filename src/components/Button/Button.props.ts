import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Расширение типа для добавление всех свойств кнопки
  children: ReactNode; // Типизизация дочерних элементов в Реакт
  appearance?: 'big' | 'small';
}
