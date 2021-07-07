// Thanks to https://tobiasahlin.com/spinkit/

import styles from './FlatSpinner.module.css';

const FlatSpinner = ({ color, size }) => {
  const height = size ? `${size}px` : '24px';
  const width = size ? `${size * (70 / 24)}px` : '70px';

  const divDimensions = size ? `${size * (18 / 24)}px` : '18px';

  return (
    <div
      className={styles.spinner}
      style={{
        '--dot-color': `var(--${color || 'dark'})`,
        height,
        width,
      }}
    >
      <div
        className={styles.bounce1}
        style={{ width: divDimensions, height: divDimensions }}
      ></div>
      <div
        className={styles.bounce2}
        style={{ width: divDimensions, height: divDimensions }}
      ></div>
      <div style={{ width: divDimensions, height: divDimensions }}></div>
    </div>
  );
};

export default FlatSpinner;
