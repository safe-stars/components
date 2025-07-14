import { clsx } from 'clsx';
import styles from './styles.module.css';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  classes?: {
    root?: string;
    overlay?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    content?: string;
  };
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
          classes?.overlay
        )} 
        onClick={onClose} 
      />
      <div 
        className={clsx(
          styles.drawer,
          isOpen && styles.open,
          classes?.root
        )}
        style={{
          transform: isOpen ? undefined : 'translateY(100%)',
        }}
      >
        <header className={clsx(
          styles.drawerHeader,
          classes?.header
        )}>
          {title && (
            <h2 className={clsx(
              styles.drawerTitle,
              classes?.title
            )}>
              {title}
            </h2>
          )}
          <button 
            className={clsx(
              styles.drawerClose,
              classes?.closeButton
            )}  
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className={clsx(
          styles.drawerBody,
          classes?.content
        )}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;