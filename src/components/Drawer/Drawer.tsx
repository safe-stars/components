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
  classes?: DrawerCustomStyles;
}

const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  classes,
}: DrawerProps) => {
  return (
    <>
      <div 
        className={clsx(
          styles.drawerOverlay,
          isOpen && styles.visible,
          classes?.['drawer-overlay']
        )} 
        onClick={onClose} 
      />
      <div 
        className={clsx(
          styles.drawer,
          isOpen && styles.open,
          classes?.['drawer']
        )}
        style={{
          transform: isOpen ? undefined : 'translateY(100%)',
        }}
      >
        <header className={clsx(
          styles.drawerHeader,
          classes?.['drawer-header']
        )}>
          {title && (
            <h2 className={clsx(
              styles.drawerTitle,
              classes?.['drawer-title']
            )}>
              {title}
            </h2>
          )}
          <button 
            className={clsx(
              styles.drawerClose,
              classes?.['drawer-close']
            )} 
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className={clsx(
          styles.drawerBody,
          classes?.['drawer-body']
        )}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;