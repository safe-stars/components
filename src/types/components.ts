import { ButtonProps, DrawerProps, SpinnerProps } from '../components';

export interface ButtonCustomStyles {
  Button?: string;
}

export interface DrawerCustomStyles   {
  DrawerOverlay?: string;
  Drawer?: string;
  DrawerHeader?: string;
  DrawerTitle?: string;
  DrawerClose?: string;
  DrawerBody?: string;
}

export interface SpinnerCustomStyles {
  Spinner?: string;
}

export type CustomStyles = ButtonCustomStyles & DrawerCustomStyles & SpinnerCustomStyles;

export type ButtonCustomProps = Omit<ButtonProps, 'classes'>;
export type DrawerCustomProps = Omit<DrawerProps, 'classes'>;
export type SpinnerCustomProps = Omit<SpinnerProps, 'classes'>; 