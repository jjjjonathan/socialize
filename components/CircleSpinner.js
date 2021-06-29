import styles from './CircleSpinner.module.css';

const CircleSpinner = () => (
  <div className={styles.skChase}>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
  </div>
);

export default CircleSpinner;
