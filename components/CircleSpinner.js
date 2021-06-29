// Thanks to https://tobiasahlin.com/spinkit/

import styles from './CircleSpinner.module.css';

const CircleSpinner = ({ color, size }) => {
  const dimensions = size ? `${size}px` : '40px';

  return (
    <div
      className={styles.skChase}
      style={{
        '--dot-color': `var(--${color || 'dark'})`,
        width: dimensions,
        height: dimensions,
      }}
    >
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
    </div>
  );
};

export default CircleSpinner;
