import { clsx } from 'clsx';
import styles from './styles.module.css';

export interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={clsx(
        styles.loader,
        className
      )}
    >
    </div>
  );
};

export default Spinner;
