import './styles.css';

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
      <div className={`drawer-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <div 
        className={`drawer ${isOpen ? 'open' : ''}`}
        style={{
          transform: isOpen ? undefined : 'translateY(100%)',
        }}
      >
        <header className="drawer-header">
          {title && <h2 className="drawer-title">{title}</h2>}
          <button className="drawer-close" onClick={onClose}>×</button>
        </header>
        <div className="drawer-body">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;