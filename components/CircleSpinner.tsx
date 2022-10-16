// Thanks to https://tobiasahlin.com/spinkit/

import styles from './CircleSpinner.module.css';

type Props = {
  color?: string;
  size?: string;
};

const CircleSpinner = ({ color = 'dark', size = '40' }: Props) => {
  const dimensions = `${size}px`;

  return (
    <div
      className={styles.skChase}
      style={{
        // @ts-ignore
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
