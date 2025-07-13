import { clsx } from 'clsx';
import styles from './styles.module.css';

export interface SpinnerCustomStyles {
  'spinner'?: string;
}

export interface SpinnerProps {
  classes?: SpinnerCustomStyles;
}

const Spinner = ({ classes }: SpinnerProps) => {
    return (
        <div className={clsx(
            styles.loader,
            classes?.['spinner']
        )}></div>
    );
};

export default Spinner;
