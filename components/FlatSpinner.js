import styles from './FlatSpinner.module.css';

const FlatSpinner = () => (
  <div className={styles.spinner}>
    <div className={styles.bounce1}></div>
    <div className={styles.bounce2}></div>
    <div className={styles.bounce3}></div>
  </div>
);

export default FlatSpinner;
