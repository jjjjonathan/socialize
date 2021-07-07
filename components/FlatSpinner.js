// Thanks to https://tobiasahlin.com/spinkit/

import styles from './FlatSpinner.module.css';

const FlatSpinner = ({ color, size }) => {
  const dimensions = size ? `${size}px` : '40px';

  return (
    <div
      className={styles.spinner}
      style={{
        '--dot-color': `var(--${color || 'dark'})`,
        width: dimensions,
        height: dimensions,
      }}
    >
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
};

export default FlatSpinner;
