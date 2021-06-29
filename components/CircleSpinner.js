import styles from './CircleSpinner.module.css';

const CircleSpinner = ({ color }) => (
  <div
    className={styles.skChase}
    style={{ '--dot-color': `var(--${color || 'dark'})` }}
  >
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
  </div>
);

export default CircleSpinner;
