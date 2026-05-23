import styles from './Spinner.module.css';

const Spinner = (): React.ReactElement => {
  return (
    <div className={styles.spinner_container} data-testid="spinner">
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
