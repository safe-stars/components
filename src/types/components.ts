import { ButtonCustomStyles } from '../components/Button/Button';
import { DrawerCustomStyles } from '../components/Drawer/Drawer';
import { SpinnerCustomStyles } from '../components/Spinner/Spinner';
import { ButtonProps, DrawerProps, SpinnerProps } from '../components';

export interface ComponentsCustomStyles {
  Button?: ButtonCustomStyles;
  Drawer?: DrawerCustomStyles;
  Spinner?: SpinnerCustomStyles;
}

// Типы для кастомизированных компонентов (без classes)
export type ButtonCustomProps = Omit<ButtonProps, 'classes'>;
export type DrawerCustomProps = Omit<DrawerProps, 'classes'>;
export type SpinnerCustomProps = Omit<SpinnerProps, 'classes'>; 