// Thanks to https://tobiasahlin.com/spinkit/

import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './FlatSpinner.module.css';

type Props = {
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
};

const FlatSpinner = ({
  color = 'dark',
  size,
  className = '',
  style = {},
  props = {},
}: Props) => {
  const sizeNum = Number(size);

  const height = size ? `${size}px` : '24px';
  const width = size ? `${sizeNum * (70 / 24)}px` : '70px';

  const divDimensions = size ? `${sizeNum * (18 / 24)}px` : '18px';

  return (
    <div
      className={`${className} ${styles.spinner}`}
      style={{
        // @ts-ignore
        '--dot-color': `var(--${color})`,
        height,
        width,
        ...style,
      }}
      {...props}
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
