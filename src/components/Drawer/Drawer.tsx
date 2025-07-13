import { clsx } from 'clsx';
import styles from './styles.module.css';
import {DrawerCustomStyles} from '../../types'

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
          classes?.DrawerOverlay
        )} 
        onClick={onClose} 
      />
      <div 
        className={clsx(
          styles.drawer,
          isOpen && styles.open,
          classes?.Drawer
        )}
        style={{
          transform: isOpen ? undefined : 'translateY(100%)',
        }}
      >
        <header className={clsx(
          styles.drawerHeader,
          classes?.DrawerHeader
        )}>
          {title && (
            <h2 className={clsx(
              styles.drawerTitle,
              classes?.DrawerTitle
            )}>
              {title}
            </h2>
          )}
          <button 
            className={clsx(
              styles.drawerClose,
              classes?.DrawerClose
            )}  
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className={clsx(
          styles.drawerBody,
          classes?.DrawerBody
        )}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;