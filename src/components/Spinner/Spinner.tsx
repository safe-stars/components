import { clsx } from 'clsx';
import styles from './styles.module.css';

export interface SpinnerProps {
  classes?: {
    root?: string;
  };
}

const Spinner = ({ classes }: SpinnerProps) => {
    return (
        <div className={clsx(
            styles.loader,
            classes?.root
        )}></div>
    );
};

export default Spinner;
