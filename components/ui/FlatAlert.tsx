import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type?: 'error';
}

const FlatAlert = ({ children, type, ...props }: Props) => (
  <div {...props}>
    <p className={type === 'error' ? 'text-danger' : 'text-muted'}>
      {type === 'error' && (
        <i className="bi bi-exclamation-triangle-fill mr-1" />
      )}
      <span className="medium"> {children}</span>
    </p>
  </div>
);

export default FlatAlert;
