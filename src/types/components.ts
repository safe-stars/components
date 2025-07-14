import { ButtonProps, DrawerProps, SpinnerProps } from '../components';

// Извлекаем типы classes из компонентов
export type ButtonCustomStyles = NonNullable<ButtonProps['classes']>;
export type DrawerCustomStyles = NonNullable<DrawerProps['classes']>;
export type SpinnerCustomStyles = NonNullable<SpinnerProps['classes']>;

// Новый объединенный тип как словарь
export type CustomStyles = {
  [key: string]: any;
};

// Типы пропсов без classes для обратной совместимости
export type ButtonCustomProps = Omit<ButtonProps, 'classes'>;
export type DrawerCustomProps = Omit<DrawerProps, 'classes'>;
export type SpinnerCustomProps = Omit<SpinnerProps, 'classes'>; 