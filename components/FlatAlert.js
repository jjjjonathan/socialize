const FlatAlert = ({ children, type, ...props }) => {
  const textClass = () => {
    if (type === 'error') return 'text-danger';
    return 'text-muted';
  };

  const icon = () => {
    if (type === 'error')
      return <i className="bi bi-exclamation-triangle-fill mr-1"></i>;
    return null;
  };

  return (
    <div {...props}>
      <p className={textClass()}>
        {icon()}
        <span className="medium"> {children}</span>
      </p>
    </div>
  );
};

export default FlatAlert;
