import { clsx } from 'clsx';
import styles from './styles.module.css';

export interface SpinnerCustomStyles {
  'spinner'?: string;
}

export interface SpinnerProps {
  custom_styles?: SpinnerCustomStyles;
}

const Spinner = ({ custom_styles }: SpinnerProps) => {
    return (
        <div className={clsx(
            styles.loader,
            custom_styles?.['spinner']
        )}></div>
    );
};

export default Spinner;
