const FlatAlert = ({ children, className, ...props }) => (
  <div className={`text-center ${className}`} {...props}>
    <p className="text-danger">
      <i className="bi bi-exclamation-triangle-fill mr-1"></i>
      <span className="medium">{children}</span>
    </p>
  </div>
);

export default FlatAlert;
