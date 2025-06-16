import styles from './styles.module.css';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
}: DrawerProps) => {
  return (
    <>
      <div className={`${styles['drawer-overlay']} ${isOpen ? styles['visible'] : ''}`} onClick={onClose} />
      <div 
        className={`${styles['drawer']} ${isOpen ? styles['open'] : ''}`}
        style={{
          transform: isOpen ? undefined : 'translateY(100%)',
        }}
      >
        <header className={styles["drawer-header"]}>
          {title && <h2 className={styles["drawer-title"]}>{title}</h2>}
          <button className={styles["drawer-close"]} onClick={onClose}>×</button>
        </header>
        <div className={styles["drawer-body"]}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;