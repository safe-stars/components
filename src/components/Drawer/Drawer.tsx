import { clsx } from 'clsx';
import styles from './styles.module.css';

export interface DrawerCustomStyles {
  'drawer-overlay'?: string;
  'drawer'?: string;
  'drawer-header'?: string;
  'drawer-title'?: string;
  'drawer-close'?: string;
  'drawer-body'?: string;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  custom_styles?: DrawerCustomStyles;
}

const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  custom_styles,
}: DrawerProps) => {
  return (
    <>
      <div 
        className={clsx(
          styles.drawerOverlay,
          isOpen && styles.visible,
          custom_styles?.['drawer-overlay']
        )} 
        onClick={onClose} 
      />
      <div 
        className={clsx(
          styles.drawer,
          isOpen && styles.open,
          custom_styles?.['drawer']
        )}
        style={{
          transform: isOpen ? undefined : 'translateY(100%)',
        }}
      >
        <header className={clsx(
          styles.drawerHeader,
          custom_styles?.['drawer-header']
        )}>
          {title && (
            <h2 className={clsx(
              styles.drawerTitle,
              custom_styles?.['drawer-title']
            )}>
              {title}
            </h2>
          )}
          <button 
            className={clsx(
              styles.drawerClose,
              custom_styles?.['drawer-close']
            )} 
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className={clsx(
          styles.drawerBody,
          custom_styles?.['drawer-body']
        )}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;