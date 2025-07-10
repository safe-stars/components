import { ButtonCustomStyles } from '../components/Button/Button';
import { DrawerCustomStyles } from '../components/Drawer/Drawer';
import { SpinnerCustomStyles } from '../components/Spinner/Spinner';
import { ButtonProps, DrawerProps, SpinnerProps } from '../components';

export interface ComponentsCustomStyles {
  Button?: ButtonCustomStyles;
  Drawer?: DrawerCustomStyles;
  Spinner?: SpinnerCustomStyles;
}

// Типы для кастомизированных компонентов (без custom_styles)
export type ButtonCustomProps = Omit<ButtonProps, 'custom_styles'>;
export type DrawerCustomProps = Omit<DrawerProps, 'custom_styles'>;
export type SpinnerCustomProps = Omit<SpinnerProps, 'custom_styles'>; 