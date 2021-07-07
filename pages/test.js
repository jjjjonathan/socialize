import FlatSpinner from '../components/FlatSpinner';

const Test = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: '100vh' }}
  >
    <div style={{ background: 'lightgray' }}>
      <FlatSpinner />
      <FlatSpinner size="50" />
    </div>
  </div>
);

export default Test;
