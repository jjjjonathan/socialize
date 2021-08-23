import Splash from '../components/Splash';

export default function Custom500() {
  return (
    <Splash pageTitle="500 Internal Server Error">
      <h1 className="logo text-center mb-5 h3">socialize</h1>
      <h2 className="text-center h1">500</h2>
      <hr />
      <p className="text-center">500 Internal Server Error</p>
    </Splash>
  );
}
