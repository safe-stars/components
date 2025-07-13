import { clsx } from 'clsx';
import styles from './styles.module.css';
import {SpinnerCustomStyles} from '../../types'

export interface SpinnerProps {
  classes?: SpinnerCustomStyles;
}

const Spinner = ({ classes }: SpinnerProps) => {
    return (
        <div className={clsx(
            styles.loader,
            classes?.Spinner
        )}></div>
    );
};

export default Spinner;
